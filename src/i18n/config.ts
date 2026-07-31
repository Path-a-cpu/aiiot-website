// 语言配置：在这里增删语言即可扩展多语言
export const languages = {
  en: 'English',
  zh: '中文',
  de: 'Deutsch',
} as const;

// 默认语言（也是根路径 / 重定向的目标）
export const defaultLang = 'en';

export type Lang = keyof typeof languages;
export const locales = Object.keys(languages) as Lang[];
