import { DEFAULT_LOCALE } from './config.js'

import en from './locales/en.js'
import es from './locales/es.js'
import vi from './locales/vi.js'
import zh from './locales/zh.js'
import ru from './locales/ru.js'
import pl from './locales/pl.js'
import it from './locales/it.js'
import ar from './locales/ar.js'

const DICTS = { en, es, vi, zh, ru, pl, it, ar }

/**
 * Static imports, not dynamic ones. `output: export` bakes every page at build
 * time, so there is nothing to gain from code-splitting the dictionaries — and
 * a static map means a missing locale is a build error rather than a runtime
 * 404 in one language nobody on the team reads.
 */
export function getDictionary(locale) {
  return DICTS[locale] || DICTS[DEFAULT_LOCALE]
}

/**
 * Fills {placeholders}. Deliberately tiny: the alternative is pulling in an
 * i18n runtime to do string interpolation on a static site.
 *
 *   t('Enquire about {material}', { material: 'granite' })
 */
export function fill(str, vars = {}) {
  if (!str) return ''
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
}
