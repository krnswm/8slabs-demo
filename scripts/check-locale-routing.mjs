/**
 * Proves the language auto-routing cannot trap a visitor.
 *
 * The failure mode this guards against is specific and nasty: a Spanish
 * browser lands on /, gets sent to /es/, clicks "English", arrives at / — and
 * gets sent straight back to /es/. The site becomes impossible to read in
 * English. That bug is invisible to anyone testing with an English browser,
 * which is everyone building it.
 *
 *   node scripts/check-locale-routing.mjs [origin]
 */
import puppeteer from 'puppeteer-core'

import fs from 'node:fs'

/* Forward slashes: Windows accepts them and they survive every shell and
   heredoc that would otherwise eat the escapes. */
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe',
].find((p) => { try { return fs.existsSync(p) } catch (e) { return false } })
if (!CHROME) { console.error('Chrome not found — set the path in this script.'); process.exit(2) }
const ORIGIN = process.argv[2] || 'http://localhost:4321'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--disable-gpu'],
})

/** Fresh context each time: no shared storage, no shared referrer history. */
async function visit(path, { langs = ['en-US', 'en'], stored = null, blockStorage = false } = {}) {
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.evaluateOnNewDocument(
    (l, s, block, key) => {
      Object.defineProperty(navigator, 'languages', { get: () => l })
      Object.defineProperty(navigator, 'language', { get: () => l[0] })
      if (block) {
        // Safari private mode: getItem works, setItem throws.
        Object.defineProperty(window, 'localStorage', {
          get: () => ({ getItem: () => null, setItem: () => { throw new Error('blocked') }, removeItem: () => {} }),
        })
      } else if (s) {
        try { localStorage.setItem(key, s) } catch (e) {}
      }
    },
    langs, stored, blockStorage, '8slabz.lang'
  )
  await page.goto(ORIGIN + path, { waitUntil: 'networkidle0' })
  return { ctx, page }
}

const results = []
const check = (name, actual, expected) => {
  const ok = actual === expected
  results.push(ok)
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}\n        got ${actual}${ok ? '' : `\n        want ${expected}`}`)
}
const at = (page) => new URL(page.url()).pathname

console.log('LANGUAGE ROUTING\n')

// --- Detection on first arrival ---------------------------------------------
{
  const { ctx, page } = await visit('/', { langs: ['es-ES', 'es'] })
  check('Spanish browser, fresh visit to /', at(page), '/es/')
  await ctx.close()
}
{
  const { ctx, page } = await visit('/', { langs: ['en-GB', 'en'] })
  check('English browser stays on /', at(page), '/')
  await ctx.close()
}
{
  const { ctx, page } = await visit('/', { langs: ['pt-BR', 'pt'] })
  check('Unsupported language falls back to English', at(page), '/')
  await ctx.close()
}
{
  const { ctx, page } = await visit('/', { langs: ['ar-SA', 'ar'] })
  const dir = await page.evaluate(() => document.documentElement.dir)
  check('Arabic browser reaches /ar/', at(page), '/ar/')
  check('  ...and the served markup is RTL', dir, 'rtl')
  await ctx.close()
}
{
  const { ctx, page } = await visit('/catalogue/', { langs: ['zh-TW', 'zh'] })
  check('Region variant zh-TW maps to /zh/, deep path kept', at(page), '/zh/catalogue/')
  await ctx.close()
}

// --- An explicit URL always wins --------------------------------------------
{
  const { ctx, page } = await visit('/vi/catalogue/', { langs: ['es-ES', 'es'] })
  check('Emailed /vi/ link beats a Spanish browser', at(page), '/vi/catalogue/')
  await ctx.close()
}

// --- A remembered choice ----------------------------------------------------
{
  const { ctx, page } = await visit('/about/', { langs: ['en-US'], stored: 'ru' })
  check('Remembered Russian applies to a later visit', at(page), '/ru/about/')
  await ctx.close()
}
{
  const { ctx, page } = await visit('/', { langs: ['es-ES', 'es'], stored: 'en' })
  check('Remembered English beats the Spanish browser', at(page), '/')
  await ctx.close()
}

// --- The trap: switching back to English from inside the site ---------------
{
  const { ctx, page } = await visit('/', { langs: ['es-ES', 'es'] })
  check('Spanish visitor starts at /es/', at(page), '/es/')
  await page.evaluate(() => document.querySelector('.lang__menu a[hreflang="en"]').click())
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {})
  await new Promise((r) => setTimeout(r, 600))
  check('  ...clicks English and STAYS on /', at(page), '/')
  const stored = await page.evaluate(() => { try { return localStorage.getItem('8slabz.lang') } catch (e) { return null } })
  check('  ...and the choice was remembered', stored, 'en')
  await ctx.close()
}
{
  // Same journey with storage unavailable, so only the referrer guard is left.
  const { ctx, page } = await visit('/', { langs: ['es-ES', 'es'], blockStorage: true })
  check('Storage blocked: Spanish visitor starts at /es/', at(page), '/es/')
  await page.evaluate(() => document.querySelector('.lang__menu a[hreflang="en"]').click())
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {})
  await new Promise((r) => setTimeout(r, 600))
  check('  ...still escapes to English with no storage', at(page), '/')
  await ctx.close()
}

// --- Back button is not a loop ----------------------------------------------
{
  const { ctx, page } = await visit('/', { langs: ['it-IT', 'it'] })
  check('Italian visitor lands on /it/', at(page), '/it/')
  await page.evaluate(() => { document.querySelector('a[href="/it/about/"]')?.click() })
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {})
  await page.goBack({ waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 400))
  check('  ...Back returns to /it/, not a redirect loop', at(page), '/it/')
  await ctx.close()
}

await browser.close()
const failed = results.filter((r) => !r).length
console.log(`\n${results.length - failed}/${results.length} passed, ${failed} failing`)
process.exit(failed ? 1 : 0)
