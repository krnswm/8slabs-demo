/**
 * StoneSwatch — procedurally generated stone, standing in until the client
 * supplies real slab photography.
 *
 * Built on SVG <feTurbulence> fractal noise rather than repeating CSS
 * gradients. This matters: stone is fractal. Repeating-linear-gradient stripes
 * read as "CSS pretending to be rock" from across the room, because the eye
 * catches the repeat instantly. Fractal noise has no repeat to catch, which is
 * why it is what VFX uses for rock and marble.
 *
 * How each face is built:
 *   1. feTurbulence generates greyscale fractal noise. The baseFrequency is
 *      ANISOTROPIC — different x and y values — which is what actually sells
 *      each material: sandstone is bedded (banded along one axis), marble
 *      flows, granite is isotropic speckle, quartzite is cleft.
 *   2. feComponentTransfer maps that greyscale through a per-stone colour ramp
 *      (vein → base → fleck), so every stone gets its real palette from
 *      stones.js rather than a tint.
 *
 * Still a placeholder, and still labelled as one on screen. Better-looking
 * placeholder, same honesty: no buyer should commit a container against this.
 */

/* Per-material noise character. The x/y frequency split is the whole trick.
 *
 * numOctaves is kept as low as each material tolerates: octaves are the main
 * cost multiplier in feTurbulence, and at swatch resolution the eye cannot
 * tell 3 octaves from 5. Dropping the two heaviest patterns from 5→3 roughly
 * halves their paint cost, which matters most on the 18-swatch catalogue. */
const PATTERNS = {
  // Marble: long slow flow along the slab, fine detail across it.
  veined: { freq: '0.011 0.09', octaves: 3, seed: 3, ramp: (v, b, f) => [v, b, b, b, f] },
  // Granite: tight isotropic speckle — the golden flecks in Black Galaxy.
  flecked: { freq: '0.75', octaves: 2, seed: 7, ramp: (v, b, f) => [b, b, v, f, f] },
  // Sandstone: bedding planes. Low x frequency, high y — reads as strata.
  layered: { freq: '0.014 0.42', octaves: 3, seed: 11, ramp: (v, b, f) => [v, b, b, f, b] },
  // Quartzite/slate: cleft, riven, directional break.
  riven: { freq: '0.13 0.06', octaves: 3, seed: 5, ramp: (v, b, f) => [v, b, b, f, f] },
}

/* Deterministic id.
 *
 * It must be deterministic, not a counter: this renders inside the client
 * catalogue as well as server components, and an id that differs between the
 * server HTML and client hydration is a hydration mismatch.
 *
 * But determinism means the same stone shown twice on one page (a rack slab
 * AND a face-card) emits the same filter id — duplicate DOM ids, which is
 * invalid HTML even though it renders fine. Hence `variant`: callers naming
 * the context they render in keeps ids unique AND stable. */
function uid(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  return 'st' + Math.abs(h).toString(36)
}

const channels = (hex) => {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function StoneSwatch({
  swatch = {},
  label,
  variant = '',
  className = '',
  style = {},
}) {
  const {
    base = '#cbb99c',
    vein = '#8a7659',
    flecks = '#efe7d6',
    pattern = 'veined',
  } = swatch

  const p = PATTERNS[pattern] || PATTERNS.veined
  const id = uid(`${variant}${label}${base}${vein}${pattern}`)

  // Map the greyscale noise through the stone's own colours, per channel.
  const stops = p.ramp(channels(vein), channels(base), channels(flecks))
  const table = (i) => stops.map((c) => (c[i] / 255).toFixed(3)).join(' ')

  return (
    <div
      className={`stone-tex ${className}`.trim()}
      role="img"
      aria-label={label ? `${label} — representative texture, not a photograph` : 'Stone texture'}
      style={{ width: '100%', height: '100%', ...style }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={p.freq}
            numOctaves={p.octaves}
            seed={p.seed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey">
            <feFuncR type="table" tableValues={table(0)} />
            <feFuncG type="table" tableValues={table(1)} />
            <feFuncB type="table" tableValues={table(2)} />
          </feComponentTransfer>
        </filter>
        <rect width="120" height="120" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}
