// Cloudflare Pages Function — OAuth 代理第 1 步
// 用户点 GitHub 登录时，Decap CMS 会打开本地址，我们重定向到 GitHub 授权页
// 注意：密钥从 Pages 项目环境变量读取（CLIENT_ID / CLIENT_SECRET），不写进代码
export function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirectUri = url.origin + '/oauth/callback';
  const githubUrl =
    'https://github.com/login/oauth/authorize?client_id=' + encodeURIComponent(env.CLIENT_ID) +
    '&redirect_uri=' + encodeURIComponent(redirectUri) +
    '&scope=' + encodeURIComponent('repo') +
    '&state=' + encodeURIComponent(crypto.randomUUID());
  return Response.redirect(githubUrl, 302);
}
