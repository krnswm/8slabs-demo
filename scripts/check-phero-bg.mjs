/**
 * Contrast for the interior heroes, which are DARK TYPE ON A LIGHT GROUND.
 *
 * That inverts the home-hero check. There, cream text fails when the photo is
 * too bright, so the brightest pixel governs. Here near-black text fails when
 * the photograph darkens the cream too far, so the DARKEST pixel in each text
 * zone is what decides, and sampling the max would pass everything.
 *
 *   node scripts/check-phero-bg.mjs [origin]
 */
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p))
const ORIGIN = process.argv[2] || 'http://localhost:3000'

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const [x, y] = [a, b].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const HEADING = lum(46, 46, 46)    // --c-heading #2E2E2E
const BODY = lum(85, 85, 85)       // --c-body    #555555, the lighter of the two

const PAGES = [
  ['/about/', 'texture-black-veined'],
  ['/catalogue/', 'texture-fantasy-brown'],
  ['/contact/', 'granite-outcrop'],
  ['/ar/about/', 'texture-black-veined (RTL)'],
]

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--disable-gpu'] })
let fail = 0

for (const [path, label] of PAGES) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(ORIGIN + path, { waitUntil: 'networkidle0' })
  // Hide the type; keep the photograph and its veil.
  await page.evaluate(() => { const el = document.querySelector('.phero__inner'); if (el) el.style.visibility = 'hidden' })
  const dir = await page.evaluate(() => document.documentElement.dir || 'ltr')
  await new Promise((r) => setTimeout(r, 700))
  const shot = await page.screenshot({ encoding: 'binary' })
  await page.close()

  const sharp = (await import('sharp')).default
  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  // The headline column: left under LTR, right under RTL.
  const [x0, x1] = dir === 'rtl' ? [0.50, 0.90] : [0.10, 0.50]
  let min = 1
  for (let y = Math.round(0.28 * info.height); y < Math.round(0.72 * info.height); y++) {
    for (let x = Math.round(x0 * info.width); x < Math.round(x1 * info.width); x++) {
      const i = (y * info.width + x) * ch
      const l = lum(data[i], data[i + 1], data[i + 2])
      if (l < min) min = l
    }
  }
  const rH = ratio(HEADING, min)
  const rB = ratio(BODY, min)
  const ok = rB >= 4.5
  if (!ok) fail++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}`)
  console.log(`        darkest bg ${min.toFixed(3)}   heading ${rH.toFixed(2)}:1   body ${rB.toFixed(2)}:1 ${ok ? '' : '  <- body text below 4.5'}`)
}
await browser.close()
console.log(`\n${fail} failing`)
process.exit(fail ? 1 : 0)
