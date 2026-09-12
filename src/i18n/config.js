/**
 * Locales.
 *
 * English lives at the ROOT (/), every other language is prefixed (/es/, /ar/).
 * English is the primary market language and the domain's default, so it keeps
 * the canonical top-level URLs rather than being pushed to /en/ behind a
 * redirect — a redirect on the homepage is a real cost for the one page most
 * likely to be linked.
 *
 * `dir` drives the <html dir> attribute. Arabic is right-to-left, which the
 * layout handles through CSS logical properties rather than a mirrored
 * stylesheet.
 */
export const DEFAULT_LOCALE = 'en'

export const LOCALES = [
  { code: 'en', label: 'English',    endonym: 'English',     dir: 'ltr' },
  { code: 'es', label: 'Spanish',    endonym: 'Español',     dir: 'ltr' },
  { code: 'vi', label: 'Vietnamese', endonym: 'Tiếng Việt',  dir: 'ltr' },
  { code: 'zh', label: 'Chinese',    endonym: '中文',         dir: 'ltr' },
  { code: 'ru', label: 'Russian',    endonym: 'Русский',     dir: 'ltr' },
  { code: 'pl', label: 'Polish',     endonym: 'Polski',      dir: 'ltr' },
  { code: 'it', label: 'Italian',    endonym: 'Italiano',    dir: 'ltr' },
  { code: 'ar', label: 'Arabic',     endonym: 'العربية',      dir: 'rtl' },
]

export const LOCALE_CODES = LOCALES.map((l) => l.code)

/** Locales that get a URL prefix — i.e. everything except the default. */
export const PREFIXED_LOCALES = LOCALE_CODES.filter((c) => c !== DEFAULT_LOCALE)

export const getLocale = (code) =>
  LOCALES.find((l) => l.code === code) || LOCALES[0]

/** Build a path for a locale: ('/about/', 'es') -> '/es/about/' */
export function localePath(path, locale) {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  return `/${locale}${clean === '/' ? '/' : clean}`
}
