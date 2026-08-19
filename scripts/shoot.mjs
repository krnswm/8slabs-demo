import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = process.argv[2] || 'C:\\Users\\karan\\AppData\\Local\\Temp\\claude\\C--Users-karan-OneDrive-Desktop-Projects-8slabs\\9bd1530b-2c5c-4600-9c1e-4900c6ef7ae7\\scratchpad\\shots'
const URL = process.argv[3] || 'http://localhost:3000/'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, dsf: 1, mobile: false },
  { name: 'laptop', width: 1280, height: 720, dsf: 1, mobile: false },
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true },
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

for (const vp of VIEWPORTS) {
  const page = await browser.newPage()
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  })
  await page.goto(URL, { waitUntil: 'networkidle0' })
  // let the entrance animations settle so we capture the resting state
  await new Promise((r) => setTimeout(r, 1600))

  const m = await page.evaluate(() => {
    const de = document.documentElement
    const overflow = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.right > de.clientWidth + 1) {
        overflow.push({
          sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
          right: Math.round(r.right),
          width: Math.round(r.width),
        })
      }
    }
    const q = (s) => {
      const el = document.querySelector(s)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
    }
    return {
      innerWidth: window.innerWidth,
      clientWidth: de.clientWidth,
      scrollWidth: de.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      burgerDisplay: getComputedStyle(document.querySelector('.nav__burger')).display,
      hero: q('.hero'),
      h1: q('.hero h1'),
      aside: q('.hero__aside'),
      cta: q('.hero__cta'),
      materials: q('.hero__materials'),
      overflow: overflow.slice(0, 8),
    }
  })

  console.log('=== ' + vp.name + ' (' + vp.width + 'x' + vp.height + ') ===')
  console.log('  innerWidth', m.innerWidth, '| clientWidth', m.clientWidth, '| scrollWidth', m.scrollWidth, '| body.scrollWidth', m.bodyScrollWidth)
  console.log('  burger display:', m.burgerDisplay)
  console.log('  hero', JSON.stringify(m.hero))
  console.log('  h1  ', JSON.stringify(m.h1))
  console.log('  aside', JSON.stringify(m.aside))
  console.log('  cta ', JSON.stringify(m.cta))
  console.log('  materials', JSON.stringify(m.materials))
  console.log('  OVERFLOWING:', m.overflow.length ? JSON.stringify(m.overflow, null, 1) : 'none')
  console.log()

  await page.screenshot({ path: `${OUT}\\p-${vp.name}.png` })
  await page.close()
}

await browser.close()
