import Link from 'next/link'
import { site, telLink, mailLink, whatsappLink } from '../data/site.js'
import { localePath, DEFAULT_LOCALE } from '../i18n/config.js'
import { fill } from '../i18n/dictionaries.js'
import BrandMark from './BrandMark.jsx'

export default function Footer({ locale = DEFAULT_LOCALE, t }) {
  const year = new Date().getFullYear()
  const p = (path) => localePath(path, locale)
  const cat = p('/catalogue/')

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link href={p('/')} className="brand" aria-label={`${site.brand} â ${t.nav.homeAria}`}>
              <BrandMark className="brand__mark" />
              <span className="brand__word">{site.brand}</span>
            </Link>
            <p style={{ marginTop: 'var(--s-4)', maxWidth: '34ch' }}>{t.footer.blurb}</p>
          </div>

          <div>
            <h4>{t.footer.pages}</h4>
            <ul className="footer__list">
              <li><Link href={p('/about/')}>{t.nav.about}</Link></li>
              <li><Link href={cat}>{t.nav.catalogue}</Link></li>
              <li><Link href={p('/contact/')}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t.footer.materials}</h4>
            <ul className="footer__list">
              <li><Link href={`${cat}#sandstone`}>{t.families.Sandstone.name}</Link></li>
              <li><Link href={`${cat}#limestone`}>{t.families.Limestone.name}</Link></li>
              <li><Link href={`${cat}#quartzite`}>{t.families.Quartzite.name}</Link></li>
              <li><Link href={`${cat}#granite`}>{t.families.Granite.name}</Link></li>
              <li><Link href={`${cat}#slate`}>{t.footer.slateMarble}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t.footer.getInTouch}</h4>
            <ul className="footer__list">
              <li>
                <a href={whatsappLink(t.common.whatsappGreeting)} target="_blank" rel="noreferrer noopener">
                  {fill(t.footer.whatsapp, { phone: site.phone })}
                </a>
              </li>
              <li><a href={telLink}>{fill(t.footer.call, { phone: site.phone })}</a></li>
              <li><a href={mailLink}>{site.email}</a></li>
              {/* Physical address removed per client feedback ("no address").
                  It is still in src/data/site.js if they change their mind. */}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>Â© {year} {site.brand} Â· {site.legalName}</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}
