// Cloudflare Pages Function — OAuth 代理第 1 步(NetlifyAuthenticator 协议)
// Decap CMS GitHub 后端使用 NetlifyAuthenticator,弹出窗口会先和主窗口握手,
// 主窗口 echo 回 'authorizing:github' 后,本页再跳转 GitHub 授权页。
// 密钥从 Pages 项目环境变量读取(CLIENT_ID / CLIENT_SECRET),不写进代码。
export function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') || 'github';
  const redirectUri = url.origin + '/oauth/callback';
  const state = crypto.randomUUID();
  const githubUrl =
    'https://github.com/login/oauth/authorize?client_id=' + encodeURIComponent(env.CLIENT_ID) +
    '&redirect_uri=' + encodeURIComponent(redirectUri) +
    '&scope=' + encodeURIComponent('repo') +
    '&state=' + encodeURIComponent(state);

  // 把 state 临时存到 sessionStorage,回调时可以不校验,但保留以备后续扩展
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorizing ${provider}...</title>
</head>
<body>
  <p>Connecting to ${provider}...</p>
  <script>
    (function() {
      var provider = ${JSON.stringify(provider)};
      var githubUrl = ${JSON.stringify(githubUrl)};
      var didRedirect = false;
      function redirect() {
        if (didRedirect) return;
        didRedirect = true;
        window.location.href = githubUrl;
      }

      // 1) 先向主窗口发送 handshake
      if (window.opener) {
        try {
          window.opener.postMessage('authorizing:' + provider, '*');
        } catch (e) {
          // 部分浏览器限制跨窗口 postMessage,继续走 fallback
        }
      }

      // 2) 等待主窗口 echo 回来,再跳转 GitHub
      window.addEventListener('message', function(e) {
        if (e.data === 'authorizing:' + provider) {
          redirect();
        }
      });

      // 3) 若 1.5 秒内没收到 echo(如主窗口已在监听直接消息),也自动跳转
      setTimeout(redirect, 1500);
    })();
  </script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
