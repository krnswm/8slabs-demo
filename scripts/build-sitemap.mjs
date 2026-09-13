/**
 * Generates public/sitemap.xml and public/robots.txt.
 *
 *   node scripts/build-sitemap.mjs
 *
 * Generated, not hand-written, and run as part of `npm run build`, because a
 * hand-kept sitemap for 32 URLs across 8 languages drifts the first time
 * anyone adds a page — and a sitemap that lists URLs which no longer exist is
 * worse than none.
 *
 * Every URL carries the full xhtml:link alternate set. That is the part that
 * matters here: it tells Google these 8 URLs are one page in 8 languages, so a
 * Spanish buyer searching in Spanish is served /es/ rather than the English
 * page. The <link rel="alternate"> tags in each page's <head> say the same
 * thing, but the sitemap is what gets the untranslated pages CRAWLED in the
 * first place.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { LOCALES, DEFAULT_LOCALE, localePath } from '../src/i18n/config.js'
import { site } from '../src/data/site.js'

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/catalogue/', priority: '0.9', changefreq: 'monthly' },
  { path: '/about/', priority: '0.7', changefreq: 'yearly' },
  { path: '/contact/', priority: '0.8', changefreq: 'yearly' },
]

/* Last content change, not "now". A sitemap that claims every page changed on
   every deploy trains crawlers to ignore the field. */
let lastmod
try {
  lastmod = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim().slice(0, 10)
} catch {
  lastmod = new Date().toISOString().slice(0, 10)
}

const base = site.url.replace(/\/$/, '')
const abs = (p) => base + p

const urls = []
for (const route of ROUTES) {
  for (const locale of LOCALES) {
    const alternates = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${abs(localePath(route.path, l.code))}"/>`
    )
    alternates.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(localePath(route.path, DEFAULT_LOCALE))}"/>`
    )
    urls.push(
      [
        '  <url>',
        `    <loc>${abs(localePath(route.path, locale.code))}</loc>`,
        ...alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n')
    )
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

const robots = `# ${site.brand} — ${base}
User-agent: *
Allow: /

# Next.js build output; nothing here is a page.
Disallow: /_next/

Sitemap: ${base}/sitemap.xml
`

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap, 'utf8')
fs.writeFileSync(path.join('public', 'robots.txt'), robots, 'utf8')

console.log(`  sitemap.xml  ${urls.length} URLs (${ROUTES.length} pages x ${LOCALES.length} locales), lastmod ${lastmod}`)
console.log(`  robots.txt   sitemap at ${base}/sitemap.xml`)
