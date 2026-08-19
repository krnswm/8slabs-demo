/**
 * Measures the nav pill: geometry (spacing / alignment) and the real contrast
 * of its text over whatever it is floating on.
 *
 *   node scripts/check-nav.mjs [url] [w] [h]
 */
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import path from 'node:path'
import os from 'node:os'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const url = process.argv[2] || 'http://localhost:3000/'
const VW = +(process.argv[3] || 1440)
const VH = +(process.argv[4] || 900)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: 1, isMobile: VW < 700 })
await page.goto(url, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1200))

/* Below 900px the links live in a dropdown that starts closed. Measuring them
   shut samples wherever their hidden boxes happen to overlap the page behind,
   which is meaningless — open it first and measure what a user actually sees. */
const collapsedNow = await page.evaluate(
  () => getComputedStyle(document.querySelector('.nav__burger')).display !== 'none'
)
if (collapsedNow) {
  await page.click('.nav__burger')
  await new Promise((r) => setTimeout(r, 700))
}

const geo = await page.evaluate(() => {
  const box = (s) => {
    const el = document.querySelector(s)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
  }
  const pill = box('.nav__inner')
  const cta = box('.nav__cta')
  const brand = box('.brand')
  const links = [...document.querySelectorAll('.nav__link')].map((el) => {
    const r = el.getBoundingClientRect()
    return {
      t: el.textContent.trim(),
      x: Math.round(r.x), y: Math.round(r.y),
      w: Math.round(r.width), h: Math.round(r.height),
      cy: Math.round(r.y + r.height / 2),
    }
  })
  const refract = document.querySelector('.nav__refract')
  // Below 900px the links and CTA live in the collapsed dropdown, not inside
  // the pill — measuring them against the pill reports phantom misalignment.
  const burger = document.querySelector('.nav__burger')
  const collapsed = burger ? getComputedStyle(burger).display !== 'none' : false
  // Read the ACTUAL link colour — the nav inverts over dark sections, so
  // assuming near-black ink would measure the wrong thing entirely. Skip the
  // current-page link: it is deliberately the accent, not the body colour.
  const linkEl =
    document.querySelector('.nav__link:not([aria-current])') ||
    document.querySelector('.nav__link')
  const linkColor = linkEl ? getComputedStyle(linkEl).color : 'rgb(46,46,46)'
  const theme = document.querySelector('.nav')?.dataset.theme || 'light'
  return {
    pill, cta, brand, links, collapsed, linkColor, theme,
    refractDisplay: refract ? getComputedStyle(refract).display : 'missing',
    refractBackdrop: refract ? getComputedStyle(refract).backdropFilter : 'n/a',
    navH: getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim(),
  }
})

console.log(`NAV GEOMETRY @ ${VW}x${VH}`)
console.log('  --nav-h        ', geo.navH)
console.log('  pill           ', JSON.stringify(geo.pill))
console.log('  brand          ', JSON.stringify(geo.brand))
console.log('  cta            ', JSON.stringify(geo.cta))
if (geo.collapsed) {
  console.log('  cta / links    in collapsed dropdown at this width — not measured')
} else if (geo.pill && geo.cta) {
  const top = geo.cta.y - geo.pill.y
  const bottom = geo.pill.y + geo.pill.h - (geo.cta.y + geo.cta.h)
  console.log(`  cta air        top ${top}px / bottom ${bottom}px ${Math.abs(top - bottom) <= 1 ? '(balanced)' : '(UNEVEN)'}`)
}
if (geo.pill && geo.brand) {
  const top = geo.brand.y - geo.pill.y
  const bottom = geo.pill.y + geo.pill.h - (geo.brand.y + geo.brand.h)
  console.log(`  brand air      top ${top}px / bottom ${bottom}px ${Math.abs(top - bottom) <= 1 ? '(balanced)' : '(UNEVEN)'}`)
}
if (!geo.collapsed && geo.links.length) {
  const cys = geo.links.map((l) => l.cy)
  const spread = Math.max(...cys) - Math.min(...cys)
  console.log(`  links baseline spread ${spread}px ${spread <= 1 ? '(aligned)' : '(MISALIGNED)'}`)
}
console.log('  refract layer  ', geo.refractDisplay, '| backdrop-filter:', geo.refractBackdrop)

/* ---- contrast of nav text over its real backdrop ---- */
const shot = path.join(os.tmpdir(), `nav-${VW}.png`)
await page.evaluate(() => {
  // Hide only the GLYPHS, keeping their surfaces painted, so the sample is the
  // background a reader sees the text on. Hiding .nav__links entirely would
  // also hide the dropdown panel and leave us measuring the page behind it.
  for (const el of document.querySelectorAll('.nav__link, .brand__word, .nav__cta')) {
    el.style.color = 'transparent'
  }
  const mark = document.querySelector('.brand__mark')
  if (mark) mark.style.visibility = 'hidden'
})
await new Promise((r) => setTimeout(r, 500))
await page.screenshot({ path: shot })
await browser.close()

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const [x, y] = [a, b].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true })
const ch = info.channels

/* Sample only the rectangles the TEXT actually occupies, not the whole pill.
   Sampling the pill wholesale reports the decorative corner sheen — a bright
   pixel 1% across, where no glyph will ever sit — and calls the nav a failure
   because of it. Contrast is a property of a text/background pair, so measure
   under the text. */
const targets = geo.links.length ? geo.links : [geo.pill]
let mn = 1
let mx = 0
for (const t of targets) {
  /* Inset the rect before sampling. The raw box picks up things that are not
     the text's background: the active link's accent underline along the
     bottom, and the panel's 1px specular rim / rounded corners at the edges.
     Both produced confident-looking failures for pixels no glyph touches. */
  const pad = 3
  for (let y = t.y + pad; y < t.y + t.h - pad - 3; y++) {
    for (let x = t.x + pad; x < t.x + t.w - pad; x++) {
      const i = (y * info.width + x) * ch
      const l = lum(data[i], data[i + 1], data[i + 2])
      if (l < mn) mn = l
      if (l > mx) mx = l
    }
  }
}
/* Chrome reports some computed colours as `color(srgb 0.96 0.94 0.92)` with
   0-1 floats rather than `rgb(245, 240, 235)`. Parsing digits blindly turns
   that into garbage — which is exactly how this script once reported a
   1,096,096:1 contrast ratio. */
const parseColor = (s) => {
  const nums = s.match(/[\d.]+/g).map(Number)
  return s.includes('color(') ? nums.slice(0, 3).map((n) => n * 255) : nums.slice(0, 3)
}
const LINK = lum(...parseColor(geo.linkColor))
// Light text is worst against the LIGHTEST part of the glass; dark text
// against the darkest.
const worst = LINK > 0.5 ? mx : mn
const r = ratio(LINK, worst)
console.log(`\n  theme "${geo.theme}"  link colour ${geo.linkColor}`)
console.log(`  glass luminance  min ${mn.toFixed(3)}  max ${mx.toFixed(3)}`)
console.log(`  link text vs worst-case glass: ${r.toFixed(2)}:1  ${r >= 4.5 ? 'PASS' : 'FAIL'}`)
