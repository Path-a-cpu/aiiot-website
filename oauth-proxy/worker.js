// Cloudflare Workers OAuth 代理 —— 让 Decap CMS 后台能用 GitHub 登录
// 部署方式：在 Cloudflare 控制台创建 Worker，粘贴本文件，并设置两个环境变量
//   CLIENT_ID     = GitHub OAuth App 的 Client ID
//   CLIENT_SECRET = GitHub OAuth App 的 Client Secret
// 然后在本文件顶部不需要写任何密钥。

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 第 1 步：Decap CMS 打开本代理的 /auth，我们重定向到 GitHub 授权页
    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const githubUrl =
        'https://github.com/login/oauth/authorize?' +
        'client_id=' + env.CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(redirectUri) +
        '&scope=repo' +
        '&state=' + crypto.randomUUID();
      return Response.redirect(githubUrl, 302);
    }

    // 第 2 步：GitHub 授权后回调本代理的 /callback，用 code 换 access_token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }

      const resp = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code: code,
        }),
      });
      const data = await resp.json();
      const token = data.access_token;
      if (!token) {
        return new Response('Failed to exchange token: ' + JSON.stringify(data), {
          status: 400,
        });
      }

      // 第 3 步：把 token 通过 postMessage 传回 Decap CMS 弹窗，然后关窗
      const html =
        '<!doctype html><html><head><meta charset="utf-8"><title>授权成功</title></head>' +
        '<body><script>(function(){' +
        'var payload = JSON.stringify({ token: "' + token + '", provider: "github" });' +
        'window.opener.postMessage(payload, "*");' +
        'window.close();' +
        '})();</script></body></html>';
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
