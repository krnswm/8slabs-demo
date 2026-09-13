import { site } from './site.js'
import { getDictionary } from '../i18n/dictionaries.js'
import { LOCALE_CODES, DEFAULT_LOCALE, localePath } from '../i18n/config.js'

/**
 * Structured data — the machine-readable description of the business.
 *
 * A search engine reading the page sees prose and has to infer what 8Slabz is.
 * This tells it outright: an organisation, in Jaipur, exporting stone, with
 * this phone number and this email. That inference is what decides whether the
 * business appears for "Indian sandstone supplier" at all, so for a B2B
 * exporter it is worth more than most visual work.
 *
 * TWO RULES SHAPE WHAT IS IN HERE.
 *
 * Only facts already on the page. The full street address sits in site.js but
 * is deliberately never rendered — the client asked for WhatsApp and no
 * address. Structured data is published data: putting the street line here
 * would leak exactly what they asked to keep off the site, and Google is
 * entitled to display it. Only the locality, which the hero and About page
 * already state, is included.
 *
 * No Product entries. Schema.org Product invites price, availability and an
 * image, and every stone face on this site is still a generated placeholder.
 * Describing those as products to a search engine is the same misrepresentation
 * as captioning them on the page, with a wider audience. It waits for real
 * photography, like everything else.
 */
export function organizationSchema(locale = DEFAULT_LOCALE) {
  const t = getDictionary(locale)
  const base = site.url.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    /* One stable id across all 32 URLs. Eight locale copies without it read as
       eight different organisations that happen to share a name. */
    '@id': `${base}/#organization`,
    name: site.brand,
    url: base + localePath('/', DEFAULT_LOCALE),
    description: t.home.sub,
    image: `${base}/og.png`,
    foundingDate: String(site.established),
    founder: { '@type': 'Person', name: site.legalName },
    email: site.email,
    telephone: `+${site.phoneRaw}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${site.phoneRaw}`,
      email: site.email,
      /* Claiming a language the site cannot actually answer in would be a
         promise it cannot keep, so this is the set the site is published in. */
      availableLanguage: LOCALE_CODES,
    },
    knowsLanguage: LOCALE_CODES,
    /* No `logo`. Google expects a real mark there and BrandMark.jsx is still a
       placeholder built from the brand name; `image` carries the OG card
       instead until the vector arrives. */
  }
}
