import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 多语言外贸站骨架
// 语言路由采用物理目录方式：src/pages/[lang]/ 对应 /en /zh /de
// 根路径 / 会重定向到默认语言 /en
export default defineConfig({
  output: 'static',
  // 已配置为上海数采物联网科技有限公司官方域名
  site: 'https://www.daq-iot.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
