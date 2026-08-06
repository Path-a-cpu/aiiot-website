// Cloudflare Pages Function — OAuth 代理第 2 步(NetlifyAuthenticator 协议)
// GitHub 授权后回调本地址,用 code 换 access_token,再按 Decap 期望的字符串格式通知前台。
// 期望消息格式(字符串):
//   成功: "authorization:github:success:{\"token\":\"gho_xxx\"}"
//   失败: "authorization:github:error:{\"message\":\"...\"}"
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const provider = 'github';

  if (!code) {
    return errorResponse(provider, 'Missing authorization code from GitHub', 400);
  }

  try {
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
        redirect_uri: url.origin + '/oauth/callback',
      }),
    });

    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      const p = new URLSearchParams(text);
      data = {
        access_token: p.get('access_token'),
        error: p.get('error'),
        error_description: p.get('error_description'),
      };
    }

    const token = data.access_token;
    if (!token) {
      return errorResponse(
        provider,
        'GitHub token exchange failed: ' + JSON.stringify(data),
        400,
      );
    }

    // Decap NetlifyAuthenticator 要求 data 里有 token 字段
    return successResponse(provider, { token });
  } catch (e) {
    return errorResponse(provider, 'Function error: ' + e.message, 500);
  }
}

function successResponse(provider, payload) {
  const payloadJson = JSON.stringify(payload);
  const message = 'authorization:' + provider + ':success:' + payloadJson;
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorized</title>
</head>
<body>
  <p>Authorization successful. Returning to CMS...</p>
  <script>
    (function() {
      var message = ${JSON.stringify(message)};
      try {
        if (window.opener) {
          window.opener.postMessage(message, '*');
        }
      } catch (e) {
        document.body.innerHTML = '<pre>postMessage error: ' + e.message + '</pre>';
      }
      // 给主窗口 500ms 处理消息后再关闭弹窗
      setTimeout(function() {
        if (window.opener) window.close();
      }, 500);
    })();
  </script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function errorResponse(provider, msg, status) {
  const payloadJson = JSON.stringify({ message: msg });
  const message = 'authorization:' + provider + ':error:' + payloadJson;
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OAuth Error</title>
</head>
<body>
  <h2>OAuth Error</h2>
  <pre>${escapeHtml(msg)}</pre>
  <p>Close this window and try again.</p>
  <script>
    (function() {
      var message = ${JSON.stringify(message)};
      try {
        if (window.opener) {
          window.opener.postMessage(message, '*');
        }
      } catch (e) {}
    })();
  </script>
</body>
</html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
