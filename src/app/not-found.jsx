import Link from 'next/link'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <div className="container nf page-in">
      <span className="eyebrow">404</span>
      <h1>That page isn’t here.</h1>
      <p className="narrow">
        The link may be out of date. The catalogue is the best place to pick the
        thread back up.
      </p>
      <div className="cta-band__btns">
        <Link className="btn btn--primary" href="/catalogue/">Browse the catalogue</Link>
        <Link className="btn btn--ghost" href="/">Back to home</Link>
      </div>
    </div>
  )
}
