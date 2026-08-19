/**
 * Samples the REAL rendered pixels of a screenshot and reports contrast for the
 * zones where text sits. Photographic backgrounds cannot be checked with token
 * maths — only the actual pixels tell you whether the scrim is strong enough.
 *
 *   node scripts/check-contrast.mjs <screenshot.png>
 */
import sharp from 'sharp'

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const [x, y] = [a, b].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const file = process.argv[2]
const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true })
const ch = info.channels

const zone = (x0, x1, y0, y1) => {
  let mn = 1, mx = 0
  for (let y = y0; y < Math.min(y1, info.height); y++) {
    for (let x = x0; x < Math.min(x1, info.width); x++) {
      const i = (y * info.width + x) * ch
      const l = lum(data[i], data[i + 1], data[i + 2])
      if (l < mn) mn = l
      if (l > mx) mx = l
    }
  }
  return { mn, mx }
}

const CREAM = lum(247, 245, 242)
const INK = lum(46, 46, 46)
const RAIL = lum(200, 198, 195) // material rail label ~78% cream

console.log(`sampling ${info.width}x${info.height}\n`)

// Glass pill interior, between the wordmark and the links (no text there).
const pill = zone(420, 780, 22, 54)
console.log('NAV GLASS PILL')
console.log(`  backdrop luminance  min ${pill.mn.toFixed(3)}  max ${pill.mx.toFixed(3)}`)
const navR = ratio(INK, pill.mn)
console.log(`  #2E2E2E link vs darkest pixel: ${navR.toFixed(2)}:1  ${navR >= 4.5 ? 'PASS' : 'FAIL'}\n`)

// Hero headline + copy zone (left column, over the scrimmed photo).
const body = zone(164, 700, 290, 660)
const bodyR = ratio(CREAM, body.mx)
console.log('HERO TEXT ZONE (photo + scrim)')
console.log(`  backdrop luminance max ${body.mx.toFixed(3)}`)
console.log(`  cream text vs brightest pixel: ${bodyR.toFixed(2)}:1  ${bodyR >= 4.5 ? 'PASS' : 'FAIL'}\n`)

// Full-width material rail across the base.
const rail = zone(164, info.width - 160, info.height - 62, info.height - 28)
const railR = ratio(RAIL, rail.mx)
console.log('MATERIAL RAIL')
console.log(`  backdrop luminance max ${rail.mx.toFixed(3)}`)
console.log(`  rail label vs brightest pixel: ${railR.toFixed(2)}:1  ${railR >= 4.5 ? 'PASS' : 'FAIL'}\n`)

// Top rail (full width, includes the lighter right side).
const top = zone(164, info.width - 160, 88, 112)
const topR = ratio(RAIL, top.mx)
console.log('TOP RAIL')
console.log(`  backdrop luminance max ${top.mx.toFixed(3)}`)
console.log(`  rail label vs brightest pixel: ${topR.toFixed(2)}:1  ${topR >= 4.5 ? 'PASS' : 'FAIL'}`)
