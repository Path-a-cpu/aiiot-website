import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 多语言外贸站骨架
// 语言路由采用物理目录方式：src/pages/[lang]/ 对应 /en /zh /de
// 根路径 / 会重定向到默认语言 /en
export default defineConfig({
  output: 'static',
  // 网站域名：默认 daq-iot.com；部署到 Cloudflare Pages 时用环境变量 SITE_URL 覆盖（如 https://xxx.pages.dev），绑自定义域名后改该变量即可，无需改代码
  site: process.env.SITE_URL || 'https://www.daq-iot.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
