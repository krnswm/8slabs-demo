/**
 * Fails if any locale drifts from the English key shape.
 *
 * A missing key in one language does not throw — it renders `undefined` in the
 * middle of a sentence, in a language nobody on the team reads. This is the
 * cheapest possible guard against that.
 *
 *   node scripts/check-i18n.mjs
 */
import { LOCALES, DEFAULT_LOCALE } from '../src/i18n/config.js'
import { getDictionary } from '../src/i18n/dictionaries.js'

const shape = (obj, prefix = '') => {
  const keys = []
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (Array.isArray(v)) {
      keys.push(`${path}[]:${v.length}`)
      v.forEach((item, i) => {
        if (item && typeof item === 'object') keys.push(...shape(item, `${path}[${i}]`))
      })
    } else if (v && typeof v === 'object') {
      keys.push(...shape(v, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

const base = getDictionary(DEFAULT_LOCALE)
const baseKeys = shape(base).filter((k) => !k.startsWith('meta.')).sort()

let failed = 0
console.log(`reference: ${DEFAULT_LOCALE} — ${baseKeys.length} keys\n`)

for (const { code, endonym } of LOCALES) {
  const d = getDictionary(code)
  const keys = shape(d).filter((k) => !k.startsWith('meta.')).sort()
  const missing = baseKeys.filter((k) => !keys.includes(k))
  const extra = keys.filter((k) => !baseKeys.includes(k))

  // Untranslated: identical to English. Proper nouns are expected to match, so
  // this is reported as information, not failure.
  let same = 0
  const walk = (a, b) => {
    for (const [k, v] of Object.entries(a)) {
      if (k === 'meta') continue
      if (typeof v === 'string') { if (b?.[k] === v) same++ }
      else if (v && typeof v === 'object') walk(v, b?.[k])
    }
  }
  if (code !== DEFAULT_LOCALE) walk(base, d)

  const ok = missing.length === 0 && extra.length === 0
  if (!ok) failed++
  const flag = d.meta?.reviewed ? 'reviewed' : 'UNREVIEWED'
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${code.padEnd(3)} ${endonym.padEnd(12)} ` +
      `keys ${String(keys.length).padStart(3)}  ${flag}` +
      (code === DEFAULT_LOCALE ? '' : `  identical-to-en: ${same}`)
  )
  if (missing.length) console.log(`        missing: ${missing.slice(0, 6).join(', ')}${missing.length > 6 ? ` …+${missing.length - 6}` : ''}`)
  if (extra.length) console.log(`        extra  : ${extra.slice(0, 6).join(', ')}${extra.length > 6 ? ` …+${extra.length - 6}` : ''}`)
}

console.log(`\n${failed} locale(s) failing`)
process.exit(failed ? 1 : 0)
