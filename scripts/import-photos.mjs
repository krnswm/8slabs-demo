/**
 * Imports the client's supplied photography into public/photos/ as AVIF+WebP.
 *
 *   node scripts/import-photos.mjs
 *
 * Source files stay OUT of the repo: they are large, and several are of
 * uncertain provenance (see README -> "Photography"). This script is the record
 * of what was imported and from where, so the set can be rebuilt or audited.
 *
 * Four supplied files are deliberately NOT here — all carry a visible
 * watermark or UI overlay and cannot go on a commercial site:
 *   1.jpg          "CHANGE PRODUCT" button burned in (a product visualiser)
 *   image(4).png   Shutterstock "AI-Generated Image"
 *   image(6).png   saliarwin.com
 *   image.png      iStock / xphotoz
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'C:/Users/karan/Downloads/Photos-1-001/'
const OUT = 'public/photos'

/* [source file, output slug, widths] — widths chosen per role, not uniformly:
   a full-bleed band needs 1600, a card in a grid never exceeds 800. */
const SET = [
  // --- Operations. No product claim attaches to these, which is why they are
  //     the safest and, for a buyer judging whether you are real, the best.
  ['IMG_7047.jpg',    'slab-tagged-yard',      [1600, 1000, 640]],
  ['image(2).png',    'quarry-face',           [1100, 700]],
  ['image(9).png',    'setts-stacked',         [900, 600]],
  ['image(1).png',    'granite-outcrop',       [1000, 640]],
  // --- Material textures, used at FAMILY level only.
  ['IMG_0627.jpg',    'texture-black-veined',  [1200, 800]],
  ['fantasy brown.JPG','texture-fantasy-brown',[960, 640]],
  ['1(1).jpg',        'texture-rainforest',    [960, 640]],
  ['image(7).png',    'texture-green-marble',  [900, 600]],
  ['image(5).png',    'samples-linen',         [900, 600]],
  ['image(3).png',    'studio-blocks',         [900, 600]],
  // --- Finished installations.
  ['2.jpg',           'app-kitchen-dark',      [1000, 640]],
  ['3.jpg',           'app-kitchen-island',    [1000, 640]],
  ['4 - Copy.jpg',    'app-kitchen-island-2',  [1000, 640]],
  ['5 - Copy.jpg',    'app-kitchen-cream',     [1000, 640]],
  ['6.jpg',           'app-kitchen-taupe',     [1000, 640]],
  ['image(10).png',   'app-waterfall-island',  [900, 600]],
  ['image(8).png',    'app-kitchen-marble',    [900, 600]],
  ['download.png',    'app-bathroom-vanity',   [1100, 700]],
]

fs.mkdirSync(OUT, { recursive: true })
let total = 0
for (const [file, slug, widths] of SET) {
  const src = path.join(SRC, file)
  if (!fs.existsSync(src)) { console.log(`  MISSING  ${file}`); continue }
  const meta = await sharp(src).metadata()
  const line = []
  /* Never upscale, but never emit nothing either: a source smaller than every
     requested width still gets exported at its own size. Eight of these are
     474px — Pinterest's thumbnail width — and silently skipping them hid that. */
  const useful = widths.filter((w) => w <= meta.width)
  if (!useful.length) useful.push(meta.width)
  for (const w of useful) {
    for (const [fmt, opts] of [['avif', { quality: 58 }], ['webp', { quality: 76 }]]) {
      const dest = path.join(OUT, `${slug}-${w}.${fmt}`)
      const info = await sharp(src).resize({ width: w }).toFormat(fmt, opts).toFile(dest)
      total += info.size
      if (fmt === 'avif') line.push(`${w}w ${(info.size / 1024).toFixed(0)}KB`)
    }
  }
  /* 800px is the floor for a card on a 2x display at ~400 CSS px. Below that
     the image can only be a small thumbnail without going visibly soft. */
  const flag = meta.width < 800 ? '   ⚠ THUMBNAIL ONLY' : ''
  console.log(`  ${slug.padEnd(24)} ${String(meta.width + 'x' + meta.height).padEnd(11)} -> ${line.join('  ').padEnd(34)}${flag}`)
}
console.log(`\n  ${SET.length} photos, ${(total / 1024 / 1024).toFixed(2)} MB total (both formats)`)
