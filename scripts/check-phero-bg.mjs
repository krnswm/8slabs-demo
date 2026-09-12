/**
 * Contrast for the interior heroes: DARK TYPE ON A LIGHT GROUND.
 *
 * That inverts the home-hero check. There, cream text fails when the photo is
 * too bright, so the brightest pixel governs. Here near-black text fails when
 * the photograph darkens the cream too far, so the DARKEST pixel under each
 * run of text is what decides; sampling the max would pass anything.
 *
 * It measures the REAL bounding box of every text element and its REAL
 * computed colour, rather than fractions of the viewport. These headlines are
 * centred, so a hand-written "left column" zone measures mostly empty paper
 * and reports a number that has nothing to do with the type.
 *
 *   node scripts/check-phero-bg.mjs [origin] [opacityOverride]
 */
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import sharp from 'sharp'

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p))
const ORIGIN = process.argv[2] || 'http://localhost:3000'
const OPACITY = process.argv[3] ? Number(process.argv[3]) : null

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const parse = (s) => { const m = s.match(/[\d.]+/g).map(Number); return lum(m[0], m[1], m[2]) }
const ratio = (a, b) => { const [x, y] = [a, b].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const PAGES = [['/about/'], ['/catalogue/'], ['/contact/'], ['/ar/about/'], ['/ar/contact/']]
/* Both shapes. The veil opens at BOTH margins, and on a phone the text runs
   nearly edge to edge — so the narrow viewport is where type is most likely to
   land on open photograph, not the wide one. */
const VIEWPORTS = [[1440, 900, 'desktop'], [390, 844, 'mobile']]
const SEL = ['.phero__lead .eyebrow', '.phero h1', '.phero .lead', '.phero__top .mono', '.phero__facts dd', '.phero__facts dt']

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--disable-gpu'] })
let fail = 0

for (const [vw, vh, vname] of VIEWPORTS) {
 console.log(`
  ${vname} ${vw}x${vh}`)
 for (const [path] of PAGES) {
  const page = await browser.newPage()
  await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 1, isMobile: vw < 700 })
  await page.goto(ORIGIN + path, { waitUntil: 'networkidle0' })
  if (OPACITY !== null) {
    await page.evaluate((o) => {
      const img = document.querySelector('.phero__bg img')
      if (img) img.style.opacity = String(o)
    }, OPACITY)
  }
  // Real boxes and real colours, captured BEFORE the type is hidden.
  const items = await page.evaluate((sels) => {
    const out = []
    for (const sel of sels) {
      for (const el of document.querySelectorAll(sel)) {
        const r = el.getBoundingClientRect()
        if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue
        out.push({ sel, color: getComputedStyle(el).color,
                   x: Math.max(0, r.x), y: Math.max(0, r.y), w: r.width, h: r.height })
      }
    }
    return out
  }, SEL)
  const photo = await page.evaluate(() => document.querySelector('.phero')?.dataset.photo || '(none)')
  /* Hide every foreground layer, not just the type. The floating WhatsApp
     button is dark green (#075E54, luminance 0.087) and on a phone it sits
     directly over the spec row — sampled as "background" it reports 1.77:1 and
     condemns a hero that is actually fine. The nav pill does the same thing to
     the crumb line. */
  await page.evaluate(() => {
    for (const sel of ['.phero__inner', '.wa-float', '.nav']) {
      const el = document.querySelector(sel)
      if (el) el.style.visibility = 'hidden'
    }
  })
  await new Promise((r) => setTimeout(r, 600))
  const shot = await page.screenshot({ encoding: 'binary' })
  await page.close()

  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  let worst = { r: Infinity }
  for (const it of items) {
    let min = 1
    const x1 = Math.min(info.width, Math.round(it.x + it.w))
    const y1 = Math.min(info.height, Math.round(it.y + it.h))
    for (let y = Math.round(it.y); y < y1; y++) {
      for (let x = Math.round(it.x); x < x1; x++) {
        const i = (y * info.width + x) * ch
        const l = lum(data[i], data[i + 1], data[i + 2])
        if (l < min) min = l
      }
    }
    const r = ratio(parse(it.color), min)
    if (r < worst.r) worst = { r, sel: it.sel, min, color: it.color }
  }
  const ok = worst.r >= 4.5
  if (!ok) fail++
  console.log(`    ${ok ? 'PASS' : 'FAIL'}  ${path.padEnd(15)} ${photo.padEnd(23)} worst ${worst.r.toFixed(2)}:1  (${worst.sel}, bg ${worst.min.toFixed(3)})`)
 }
}
await browser.close()
console.log(`\n${fail} failing${OPACITY !== null ? `   [opacity override ${OPACITY}]` : ''}`)
process.exit(fail ? 1 : 0)
