import { ui } from './ui';
import { defaultLang, type Lang } from './config';
import { getCollection } from 'astro:content';

// 旧同步方式：仅在未迁移到 content collections 的组件里使用
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

// 新异步方式：从 content collections 读取 translations 集合（body 为 JSON 字符串）
export async function getTranslations(lang: Lang) {
  const entries = await getCollection('translations', (entry) => entry.id.startsWith(lang + '/'));
  const raw = entries[0]?.body?.trim() || '{}';
  let data: Record<string, string> = {};
  try {
    data = JSON.parse(raw) as Record<string, string>;
  } catch {
    data = {};
  }
  return function t(key: string, fallback?: string): string {
    const value = data[key];
    return typeof value === 'string' ? value : (fallback ?? key);
  };
}

// 去掉当前路径的语言前缀，返回纯路径（如 /en/about -> /about）
export function stripLang(pathname: string, lang: Lang): string {
  const prefix = `/${lang}`;
  if (pathname === prefix) return '/';
  if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length) || '/';
  return pathname;
}
