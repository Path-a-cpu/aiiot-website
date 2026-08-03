// Cloudflare Pages Function — OAuth 代理第 2 步
// GitHub 授权后回调本地址，用 code 换 access_token，再通知前台登录成功
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response(errorHtml('Missing authorization code'), { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  try {
    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        code: code,
        redirect_uri: url.origin + '/oauth/callback',
      }),
    });
    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      const p = new URLSearchParams(text);
      data = { access_token: p.get('access_token'), error: p.get('error'), error_description: p.get('error_description') };
    }
    const token = data.access_token;
    if (!token) {
      return new Response(errorHtml('GitHub token exchange failed: ' + JSON.stringify(data)), { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    return new Response(successHtml(token), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (e) {
    return new Response(errorHtml('Function error: ' + e.message), { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}

function successHtml(token) {
  return '<!doctype html><html><head><meta charset="utf-8"><title>Authorized</title></head><body>' +
    '<p>Authorization successful. Returning to CMS…</p><script>(function(){try{' +
    'var msg=JSON.stringify({type:"authorization:github:success",provider:"github",token:"' + token + '"});' +
    'if(window.opener){window.opener.postMessage(msg,"*");}window.close();' +
    '}catch(e){document.body.innerHTML="<pre>postMessage error: "+e.message+"</pre>";}})();</script></body></html>';
}

function errorHtml(msg) {
  return '<html><body><h2>OAuth Error</h2><pre>' + msg + '</pre><p>Close this window and try again.</p></body></html>';
}
