import { ImageResponse } from 'next/og'
import { rackStones } from '../src/data/stones.js'

/**
 * SOURCE for public/og.png — not part of the build. Kept here so the card is
 * reproducible rather than a mystery binary in public/.
 *
 * TO REGENERATE:
 *   1. cp scripts/opengraph-image.source.jsx src/app/opengraph-image.jsx
 *   2. fix the stones import path ('../src/data' -> '../data')
 *   3. npx next build
 *   4. cp out/opengraph-image public/og.png
 *   5. rm src/app/opengraph-image.jsx   (important — see below)
 *
 * WHY IT IS NOT A LIVE ROUTE:
 * Next's opengraph-image file convention exports to `/opengraph-image` with no
 * file extension, and it silently overrides any openGraph.images set in
 * metadata. Most static hosts serve an extensionless file as
 * application/octet-stream, and WhatsApp's scraper drops a preview whose
 * content-type is not an image — which would break the exact thing this card
 * exists for, on every host except Vercel. The client has no hosting yet
 * (SRS §9), so a plain .png in public/ is the portable choice.
 */
export const alt = '8Slabz — Indian natural stone, sourced and shipped'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Required by `output: 'export'` — there is no server to render this on
// request, so the PNG is baked once at build time.
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F5F2',
          padding: '64px',
        }}
      >
        {/* The rack, flattened to eight bands of real stone colour. */}
        <div style={{ display: 'flex', gap: '6px', height: '300px' }}>
          {rackStones.map((s) => (
            <div
              key={s.id}
              style={{
                flex: 1,
                display: 'flex',
                background: s.swatch.base,
                borderRadius: '2px',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              letterSpacing: '4px',
              color: '#836241',
              marginBottom: '18px',
            }}
          >
            NATURAL STONE EXPORT · JAIPUR, INDIA
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '68px',
              fontWeight: 700,
              color: '#2E2E2E',
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            8Slabz
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '30px',
              color: '#555555',
              marginTop: '14px',
            }}
          >
            The stone you specified, in the container you were promised.
          </div>
        </div>
      </div>
    ),
    size
  )
}
