// Cloudflare Workers OAuth 代理 —— 让 Decap CMS 后台用 GitHub 登录
// 部署：在 Cloudflare 控制台创建 Worker，完整覆盖粘贴本文件，设置两个环境变量后 Deploy
//   CLIENT_ID     = GitHub OAuth App 的 Client ID
//   CLIENT_SECRET = GitHub OAuth App 的 Client Secret

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = url.origin;

    // 第 1 步：Decap CMS 打开 /auth，我们重定向到 GitHub 授权页
    if (url.pathname === '/auth') {
      const redirectUri = origin + '/callback';
      const githubUrl =
        'https://github.com/login/oauth/authorize?client_id=' + encodeURIComponent(env.CLIENT_ID) +
        '&redirect_uri=' + encodeURIComponent(redirectUri) +
        '&scope=' + encodeURIComponent('repo') +
        '&state=' + encodeURIComponent(crypto.randomUUID());
      return Response.redirect(githubUrl, 302);
    }

    // 第 2 步：GitHub 授权后回调 /callback，用 code 换 access_token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return errorPage('Missing authorization code');

      try {
        const resp = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            code: code,
            redirect_uri: origin + '/callback',
          }),
        });
        const text = await resp.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          // GitHub 偶发返回 form-encoded，做兼容
          const p = new URLSearchParams(text);
          data = { access_token: p.get('access_token'), error: p.get('error'), error_description: p.get('error_description') };
        }
        const token = data.access_token;
        if (!token) return errorPage('GitHub token exchange failed: ' + JSON.stringify(data));
        return new Response(successPage(token), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      } catch (e) {
        return errorPage('Worker error: ' + e.message);
      }
    }

    return new Response('aiiot OAuth proxy', { status: 200 });
  },
};

// 成功：把 token 通过 postMessage 传回 Decap CMS 弹窗（type 字段是 Decap 识别登录成功的关键）
function successPage(token) {
  return (
    '<!doctype html><html><head><meta charset="utf-8"><title>Authorized</title></head><body>' +
    '<p>Authorization successful. Returning to CMS…</p><script>(function(){try{' +
    'var msg=JSON.stringify({type:"authorization:github:success",provider:"github",token:"' +
    token +
    '"});if(window.opener){window.opener.postMessage(msg,"*");}window.close();' +
    '}catch(e){document.body.innerHTML="<pre>postMessage error: "+e.message+"</pre>";}})();</script></body></html>'
  );
}

function errorPage(msg) {
  return new Response(
    '<html><body><h2>OAuth Error</h2><pre>' + msg + '</pre><p>Close this window and try again.</p></body></html>',
    { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
