import Link from 'next/link'
import { getDictionary } from '../../i18n/dictionaries.js'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  const t = getDictionary('en')
  return (
    <div className="container nf page-in">
      <span className="eyebrow">404</span>
      <h1>{t.notFound.heading}</h1>
      <p className="narrow">{t.notFound.body}</p>
      <div className="cta-band__btns">
        <Link className="btn btn--primary" href="/catalogue/">{t.notFound.catalogue}</Link>
        <Link className="btn btn--ghost" href="/">{t.notFound.home}</Link>
      </div>
    </div>
  )
}
