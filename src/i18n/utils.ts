import { ui } from './ui';
import { defaultLang, type Lang } from './config';

// 在页面里调用：const t = useTranslations(lang); 然后 t('nav.home')
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

// 去掉当前路径的语言前缀，返回纯路径（如 /en/about -> /about）
export function stripLang(pathname: string, lang: Lang): string {
  const prefix = `/${lang}`;
  if (pathname === prefix) return '/';
  if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length) || '/';
  return pathname;
}
