// Rotas e idioma: funções puras, compartilhadas por páginas e componentes.
import { SITE } from '../site.config';
import pt from './pt';
import en from './en';
import es from './es';

export type Lang = 'pt' | 'en' | 'es';

export const LANGS: Lang[] = ['pt', 'en', 'es'];

// O português é a versão canônica, sem prefixo na URL.
export function langPrefix(lang: Lang): string {
  return lang === 'pt' ? '' : `/${lang}`;
}

// Remove um prefixo de idioma já presente, para trocar apenas o prefixo.
function stripLangPrefix(path: string): string {
  for (const lang of LANGS) {
    if (lang === 'pt') continue;
    const prefix = langPrefix(lang);
    if (path === prefix) return '/';
    if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length);
  }
  return path;
}

export function localizedPath(lang: Lang, path: string): string {
  const bare = stripLangPrefix(path);
  const normalized = bare.startsWith('/') ? bare : `/${bare}`;
  return `${langPrefix(lang)}${normalized}`;
}

export function pathLang(pathname: string): Lang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'pt';
}

export function slugFromId(id: string): string {
  for (const lang of LANGS) {
    const prefix = `${lang}/`;
    if (id.startsWith(prefix)) return id.slice(prefix.length);
  }
  return id;
}

export function alternateUrl(lang: Lang, pathname: string): string {
  return `${SITE.url}${localizedPath(lang, pathname)}`;
}

// Textos da interface. O português é a fonte das chaves e do fallback.
const dicts: Record<Lang, Partial<Record<keyof typeof pt, string>>> = { pt, en, es };

export function t(lang: Lang, key: keyof typeof pt): string {
  return dicts[lang][key] ?? pt[key];
}
