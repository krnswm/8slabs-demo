/**
 * Screenshots the hero with all its TEXT HIDDEN, so the pixels sampled are
 * purely background, then reports the real contrast each text zone would get.
 *
 * Sampling a normal screenshot does not work: the brightest pixel inside a text
 * zone is the text itself, which makes every zone look like it fails.
 *
 *   node scripts/check-hero-bg.mjs [url]
 */
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import path from 'node:path'
import os from 'node:os'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const url = process.argv[2] || 'http://localhost:3000/'
const VW = +(process.argv[3] || 1440)
const VH = +(process.argv[4] || 900)
const shot = path.join(os.tmpdir(), `hero-bg-${VW}.png`)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: 1, isMobile: VW < 700 })
await page.goto(url, { waitUntil: 'networkidle0' })
await page.evaluate(() => {
  // Hide every foreground layer, keep the photo + scrim. The floating WhatsApp
  // button matters too: its white glyph sits inside the material-rail sample
  // zone on mobile and reads as a 1.0-luminance "background".
  for (const sel of ['.hero__inner', '.nav', '.wa-float']) {
    const el = document.querySelector(sel)
    if (el) el.style.visibility = 'hidden'
  }
})
await new Promise((r) => setTimeout(r, 900))
await page.screenshot({ path: shot })
// Which half does the type occupy? Under RTL the hero column mirrors, and
// sampling the left half would measure the empty side of the photograph.
const dir = await page.evaluate(() => document.documentElement.dir || 'ltr')
await browser.close()

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const [x, y] = [a, b].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true })
const ch = info.channels
const zone = (x0, x1, y0, y1) => {
  let mx = 0
  for (let y = y0; y < Math.min(y1, info.height); y++) {
    for (let x = x0; x < Math.min(x1, info.width); x++) {
      const i = (y * info.width + x) * ch
      const l = lum(data[i], data[i + 1], data[i + 2])
      if (l > mx) mx = l
    }
  }
  return mx
}

const CREAM = lum(247, 245, 242)
const RAIL = lum(200, 198, 195)

// Zones as fractions of the viewport so the same checks work at any width.
const fx = (f) => Math.round(f * info.width)
const fy = (f) => Math.round(f * info.height)
const narrow = info.width < 700
// LTR: text occupies the left column. RTL: the right one.
const [tx0, tx1] = narrow
  ? [0.05, 0.95]
  : dir === 'rtl'
    ? [0.51, 0.89]
    : [0.11, 0.49]
const checks = [
  [`headline + copy (${dir} text column)`, CREAM, zone(fx(tx0), fx(tx1), fy(0.31), fy(0.74))],
  ['top rail (full width)', RAIL, zone(fx(0.11), fx(0.89), fy(0.098), fy(0.125))],
  ['material rail (full width)', RAIL, zone(fx(0.11), fx(0.89), fy(0.93), fy(0.97))],
]

console.log('HERO BACKGROUND ONLY — real pixels, text hidden\n')
let fail = 0
for (const [name, textL, bgMax] of checks) {
  const r = ratio(textL, bgMax)
  const ok = r >= 4.5
  if (!ok) fail++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}:1   bg max ${bgMax.toFixed(3)}   ${name}`)
}
console.log(`\n${fail} failing`)
