/**
 * Prepares the hero background image and works out how strong the scrim over it
 * has to be for the headline to stay AA-legible.
 *
 *   node scripts/hero-image.mjs <source.png>
 *
 * Writes optimised AVIF + WebP at three widths into public/, then samples the
 * real pixels under the text zone to find the minimum scrim opacity that keeps
 * cream text at 4.5:1. Guessing a scrim by eye is how hero text ends up
 * unreadable on exactly the one photo nobody checked.
 */
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = process.argv[2]
if (!src) {
  console.error('usage: node scripts/hero-image.mjs <source>')
  process.exit(1)
}

const WIDTHS = [1536, 1024, 640]
const meta = await sharp(src).metadata()
console.log(`source: ${meta.width}x${meta.height} ${meta.format}\n`)

for (const w of WIDTHS) {
  if (w > meta.width) continue
  for (const [fmt, opts] of [['avif', { quality: 58 }], ['webp', { quality: 76 }]]) {
    const out = path.join(root, 'public', `hero-${w}.${fmt}`)
    const info = await sharp(src).resize({ width: w }).toFormat(fmt, opts).toFile(out)
    console.log(`  hero-${w}.${fmt}  ${(info.size / 1024).toFixed(0)} KB`)
  }
}

/* ---------- scrim analysis ---------------------------------------------- */
const lin = (c) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

const TEXT_L = lum(247, 245, 242) // cream #F7F5F2
// Background luminance ceiling for 4.5:1 against that text.
const CEIL = (TEXT_L + 0.05) / 4.5 - 0.05

const W = 1200
const H = 800
const { data } = await sharp(src)
  .resize({ width: W, height: H, fit: 'cover' })
  .raw()
  .toBuffer({ resolveWithObject: true })

// Zones the type actually occupies in the hero (fractions of the box).
const ZONES = {
  'headline (left 55%, upper-mid)': { x0: 0.0, x1: 0.55, y0: 0.10, y1: 0.60 },
  'copy + CTA (right 42%, lower)': { x0: 0.55, x1: 1.0, y0: 0.55, y1: 0.92 },
  'top rail (full width, top)': { x0: 0.0, x1: 1.0, y0: 0.0, y1: 0.10 },
  'material rail (full, bottom)': { x0: 0.0, x1: 1.0, y0: 0.9, y1: 1.0 },
}

console.log(`\ncream text needs background luminance <= ${CEIL.toFixed(4)} for 4.5:1\n`)

for (const [name, z] of Object.entries(ZONES)) {
  let maxL = 0
  let sumL = 0
  let n = 0
  for (let y = Math.floor(z.y0 * H); y < Math.floor(z.y1 * H); y++) {
    for (let x = Math.floor(z.x0 * W); x < Math.floor(z.x1 * W); x++) {
      const i = (y * W + x) * 3
      const l = lum(data[i], data[i + 1], data[i + 2])
      if (l > maxL) maxL = l
      sumL += l
      n++
    }
  }
  const meanL = sumL / n
  // Scrim is black at alpha a: out = img*(1-a)  =>  L_out ~ L_img*(1-a) in linear terms.
  let need = 0
  while (need < 0.99 && maxL * (1 - need) > CEIL) need += 0.01
  console.log(
    `${name.padEnd(32)} mean ${meanL.toFixed(3)}  max ${maxL.toFixed(3)}  ` +
      `-> needs ${Math.round(need * 100)}% black scrim`
  )
}
