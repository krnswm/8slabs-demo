/**
 * Dev-only visual QA: screenshot a page at a viewport, optionally scrolled to
 * a selector. Requires the preview server (`npm run build && npm run preview`).
 *
 *   node scripts/shot-at.mjs <url> <out.png> [width] [height] [scrollToSelector]
 */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const [url, out, w = '1440', h = '900', sel] = process.argv.slice(2)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle0' })

if (sel) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, sel)
}
// let scroll-reveals resolve
await new Promise((r) => setTimeout(r, 1800))
await page.screenshot({ path: out })
console.log('wrote', out)
await browser.close()
