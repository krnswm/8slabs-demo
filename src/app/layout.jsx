import { Archivo, Newsreader, IBM_Plex_Mono } from 'next/font/google'
import { site } from '../data/site.js'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFloat from '../components/WhatsAppFloat.jsx'
import './globals.css'
import './components.css'

/* Three faces, three jobs — a real pairing rather than one superfamily doing
   everything. All self-hosted at build time by next/font: no runtime request
   to Google, no layout shift, works behind a firewall.
 *
 * Archivo (display) — variable width axis, set EXPANDED. Slab proportions.
 * Newsreader (body) — variable optical-size axis, so long-form copy is set at
 *   a reading optical size rather than a display face shrunk down. A serif
 *   body under a grotesk display inverts the cream-and-serif-headline look
 *   that every AI-generated site lands on.
 * IBM Plex Mono (utility) — origins, thicknesses, finishes, dates. Architects
 *   read specs off a schedule; specs here are set like one.
 */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-body',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  /* 700 is loaded so the nav CTA can actually be bold. Without the real weight
     the browser synthesises it by smearing the 500 — which on a mono face at
     small size turns to mud. */
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.brand,
    locale: 'en_GB',
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    /* Points at a real .png rather than Next's extensionless
       /opengraph-image route: static hosts serve an extensionless file as
       application/octet-stream, and WhatsApp's scraper drops the preview when
       the content-type isn't an image. See scripts/og.mjs. */
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.brand} — ${site.tagline}` }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#F7F5F2',
  width: 'device-width',
  initialScale: 1,
  // maximumScale is deliberately not set: pinch-zoom must never be disabled.
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <head>
        {/* Scroll reveals hide their content in CSS and are released by JS.
            If JS never runs, nothing would ever be readable — so force every
            revealed element visible when scripting is off. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip">Skip to main content</a>
        <Nav />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
