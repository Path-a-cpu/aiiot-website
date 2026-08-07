import { ui } from './ui';
import { defaultLang, type Lang } from './config';
import { getCollection } from 'astro:content';

// 旧同步方式：仅在未迁移到 content collections 的组件里使用
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

// 新异步方式：从 content collections 读取各集合并合并（frontmatter 为嵌套对象）
export async function getTranslations(lang: Lang) {
  const data = await getRawSite(lang);
  return function t(key: string, fallback?: string): string {
    const value = key.split('.').reduce<any>((o, k) => (o == null ? undefined : o[k]), data);
    return typeof value === 'string' ? value : (fallback ?? key);
  };
}

// 返回完整嵌套对象，供首页等需要读取列表（行业、指标）的页面使用
export async function getSiteData(lang: Lang): Promise<Record<string, any>> {
  const data = await getRawSite(lang);
  const { name, ...rest } = data;
  return rest;
}

async function loadCollectionData(lang: Lang, collection: string): Promise<Record<string, any>> {
  const entries = await getCollection(collection as any, (entry) => entry.id.startsWith(lang + '-'));
  return (entries[0]?.data ?? {}) as Record<string, any>;
}

async function getRawSite(lang: Lang): Promise<Record<string, any>> {
  const [siteData, solutionsData, servicesData, partnersData, supportData] = await Promise.all([
    loadCollectionData(lang, 'site'),
    loadCollectionData(lang, 'solutions'),
    loadCollectionData(lang, 'services'),
    loadCollectionData(lang, 'partners'),
    loadCollectionData(lang, 'support'),
  ]);

  return {
    ...siteData,
    solutions: solutionsData,
    services: servicesData,
    partners: partnersData,
    support: supportData,
  };
}

// 去掉当前路径的语言前缀，返回纯路径（如 /en/about -> /about）
export function stripLang(pathname: string, lang: Lang): string {
  const prefix = `/${lang}`;
  if (pathname === prefix) return '/';
  if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length) || '/';
  return pathname;
}
