import { site } from '../data/site.js'
import { getDictionary } from './dictionaries.js'
import { LOCALES, DEFAULT_LOCALE, localePath } from './config.js'

/** en -> en_GB, ar -> ar, zh -> zh_CN … for og:locale. */
const OG_LOCALE = {
  en: 'en_GB', es: 'es_ES', vi: 'vi_VN', zh: 'zh_CN',
  ru: 'ru_RU', pl: 'pl_PL', it: 'it_IT', ar: 'ar',
}

/** Which dictionary section describes each route. */
const SECTION = {
  '/': 'home',
  '/about/': 'about',
  '/catalogue/': 'catalogue',
  '/contact/': 'contact',
}

/**
 * Page metadata, including the hreflang set.
 *
 * The `alternates.languages` map is the whole point of prefixing locales: it
 * tells Google that these eight URLs are the same page in different languages,
 * so a Spanish buyer searching in Spanish is served /es/ rather than the
 * English page. Without it, translating the site buys almost nothing in search.
 */
export function buildMetadata(locale = DEFAULT_LOCALE, route = '/') {
  const t = getDictionary(locale)
  const section = SECTION[route] || 'home'

  // Every section — home included — carries its own translated title.
  const title = t[section].title
  const description =
    section === 'home' ? t.home.sub : t[section].metaDescription

  const languages = Object.fromEntries(
    LOCALES.map((l) => [l.code, localePath(route, l.code)])
  )
  // x-default points at English: the version to serve when no locale matches.
  languages['x-default'] = localePath(route, DEFAULT_LOCALE)

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: localePath(route, locale),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: site.brand,
      locale: OG_LOCALE[locale] || locale,
      title,
      description,
      url: localePath(route, locale),
      /* A real .png, not Next's extensionless /opengraph-image route: most
         static hosts serve an extensionless file as application/octet-stream
         and WhatsApp's scraper drops the preview. See scripts/opengraph-image.source.jsx */
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.brand} — ${site.tagline}` }],
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}
