import Link from 'next/link'
import { site, telLink, mailLink, whatsappLink } from '../data/site.js'
import BrandMark from './BrandMark.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link href="/" className="brand" aria-label="8Slabs — home">
              <BrandMark className="brand__mark" />
              <span className="brand__word">8Slabs</span>
            </Link>
            <p style={{ marginTop: 'var(--s-4)', maxWidth: '34ch' }}>
              Natural stone from North India’s stone belt, sourced and shipped for
              professional buyers worldwide.
            </p>
          </div>

          <div>
            <h4>Pages</h4>
            <ul className="footer__list">
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/catalogue/">Catalogue</Link></li>
              <li><Link href="/journal/">Journal</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Materials</h4>
            <ul className="footer__list">
              <li><Link href="/catalogue/#kandla-grey">Sandstone</Link></li>
              <li><Link href="/catalogue/#kota-blue">Limestone</Link></li>
              <li><Link href="/catalogue/#silver-shine">Quartzite</Link></li>
              <li><Link href="/catalogue/#multicolor-slate">Slate</Link></li>
              <li><Link href="/catalogue/#makrana-white">Marble &amp; granite</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul className="footer__list">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                  WhatsApp {site.phone}
                </a>
              </li>
              <li><a href={telLink}>Call {site.phone}</a></li>
              <li><a href={mailLink}>{site.email}</a></li>
              <li>
                <address style={{ fontStyle: 'normal', fontSize: 'var(--t-sm)', marginTop: 'var(--s-3)', lineHeight: 1.7 }}>
                  {site.address.line1}<br />{site.address.line2}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {site.brand} · {site.legalName}</span>
          <span>Indian natural stone · Exported worldwide</span>
        </div>
      </div>
    </footer>
  )
}
