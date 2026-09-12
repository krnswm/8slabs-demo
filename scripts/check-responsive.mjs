/**
 * Responsive audit across the widths people actually hold.
 *
 *   node scripts/check-responsive.mjs [origin]
 *
 * Reports only things that are wrong, with the offending element named, because
 * "the page looks fine" at one width tells you nothing about the other eight.
 * 320px is included deliberately: it is the narrowest screen still in use, and
 * it is where fixed widths and long unbroken words show up first.
 */
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => fs.existsSync(p))
const ORIGIN = process.argv[2] || 'http://localhost:3000'

/* Landscape entries are not padding. The portrait tiers all stopped at 600px
   of height, so a phone held sideways (320-430px TALL) fell through every one
   of them and the heroes overflowed by up to 49px — invisible to a sweep that
   only ever rotates the width. */
const VIEWPORTS = [
  [320, 568, 'small phone'],
  [568, 320, 'phone landscape'],
  [640, 360, 'android landscape'],
  [844, 390, 'iPhone landscape'],
  [375, 667, 'iPhone SE'],
  [390, 844, 'iPhone 14'],
  [430, 932, 'Pro Max'],
  [768, 1024, 'tablet portrait'],
  [1024, 768, 'tablet landscape'],
  [1280, 720, 'small laptop'],
  [1920, 1080, 'desktop'],
  [2560, 1440, 'ultrawide'],
]
const PAGES = ['/', '/about/', '/catalogue/', '/contact/', '/ar/', '/ar/catalogue/']

const audit = () => {
  const out = { overflow: null, wide: [], tiny: [], taps: [], clipped: [] }
  const vw = document.documentElement.clientWidth

  if (document.documentElement.scrollWidth > vw + 1) {
    out.overflow = document.documentElement.scrollWidth - vw
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const cs = getComputedStyle(el)
      if (cs.position === 'fixed') continue
      if (r.right > vw + 1 || r.left < -1) {
        // Skip anything inside a container that is meant to scroll sideways.
        let p = el.parentElement, scrolls = false
        while (p) { const s = getComputedStyle(p); if (s.overflowX === 'auto' || s.overflowX === 'scroll') { scrolls = true; break } p = p.parentElement }
        if (scrolls) continue
        out.wide.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} right=${Math.round(r.right)}`)
      }
    }
  }

  for (const el of document.querySelectorAll('p, li, dd, dt, span, a, h1, h2, h3, button')) {
    const t = (el.textContent || '').trim()
    if (!t || el.children.length) continue
    const cs = getComputedStyle(el)
    const size = parseFloat(cs.fontSize)
    if (size && size < 12) out.tiny.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]} ${size.toFixed(1)}px`)
  }

  for (const el of document.querySelectorAll('a[href], button')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (getComputedStyle(el).visibility === 'hidden') continue
    if (r.height < 40 || r.width < 40) {
      const label = (el.textContent || el.getAttribute('aria-label') || '?').trim().slice(0, 22)
      out.taps.push(`"${label}" ${Math.round(r.width)}x${Math.round(r.height)}`)
    }
  }

  for (const el of document.querySelectorAll('h1, h2, h3, .lead, .eyebrow, .mono')) {
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') {
      out.clipped.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0]}`)
    }
  }
  const uniq = (a) => [...new Set(a)]
  return { ...out, wide: uniq(out.wide).slice(0, 4), tiny: uniq(out.tiny).slice(0, 4), taps: uniq(out.taps).slice(0, 5), clipped: uniq(out.clipped).slice(0, 3) }
}

let browser, problems = 0
try {
  browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--disable-gpu', '--no-sandbox'] })
  for (const [w, h, name] of VIEWPORTS) {
    console.log(`\n  ${name}  ${w}x${h}`)
    for (const path of PAGES) {
      const page = await browser.newPage()
      try {
        await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 700 })
        await page.goto(ORIGIN + path, { waitUntil: 'domcontentloaded', timeout: 30000 })
        await new Promise((r) => setTimeout(r, 900))
        const r = await page.evaluate(audit)
        const bits = []
        if (r.overflow) { bits.push(`OVERFLOW +${r.overflow}px [${r.wide.join(', ')}]`); problems++ }
        if (r.tiny.length) { bits.push(`TINY TEXT ${r.tiny.join(', ')}`); problems++ }
        if (r.taps.length) { bits.push(`SMALL TAP ${r.taps.join(', ')}`); problems++ }
        if (r.clipped.length) { bits.push(`CLIPPED ${r.clipped.join(', ')}`); problems++ }
        if (bits.length) console.log(`    ${path.padEnd(16)} ${bits.join('\n                     ')}`)
      } catch (e) {
        console.log(`    ${path.padEnd(16)} ERROR ${String(e).slice(0, 60)}`)
      } finally { await page.close() }
    }
  }
} finally { if (browser) await browser.close() }
console.log(`\n  ${problems} problem group(s)`)
process.exit(0)
