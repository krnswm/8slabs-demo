import { posts } from '../../data/posts.js'
import StoneSwatch from '../../components/StoneSwatch.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/Reveal.jsx'

export const metadata = {
  title: 'Journal',
  description:
    'Material guides and shipping notes from 8Slabs — choosing finishes, reading batch variation, and the checks that keep an export container on schedule.',
  alternates: { canonical: '/journal/' },
  openGraph: {
    title: 'Journal — 8Slabs',
    description: 'Material guides and shipping notes on Indian natural stone.',
  },
}

export default function Journal() {
  const exhibitions = posts.filter((p) => p.kind === 'Exhibition')

  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — Journal"
        meta={`${posts.length} entries`}
        eyebrow="Journal"
        title="Material guides, and what happens after the order."
        lead="Notes on specifying stone and getting it across an ocean intact — written from the jobs where it went wrong."
        facts={[
          ['Entries', posts.length],
          ['Topics', 'Guides · Shipping'],
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
                <article className="card">
                  <div className="post-card__face">
                    <StoneSwatch swatch={p.swatch} label={p.title} variant="post" />
                  </div>
                  <div className="post-card__body">
                    <span className="mono">
                      {p.kind} · {p.dateLabel} · {p.readMins} min read
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* SRS §6 asked for Exhibitions. The client supplied none, and
              attendance at a named trade fair is a factual claim that cannot be
              invented — so the category explains its own absence rather than
              silently vanishing from the page. */}
          {exhibitions.length === 0 && (
            <Reveal className="empty" style={{ marginTop: 'var(--s-12)' }}>
              <h3>Exhibitions</h3>
              <p className="narrow">
                Trade fair dates will be listed here as they are confirmed. If you
                would like to arrange a meeting at an upcoming show, message us on
                WhatsApp and we will come back with where we will be.
              </p>
            </Reveal>
          )}

          <div className="note" style={{ marginTop: 'var(--s-8)' }}>
            <b>Pre-launch note.</b> These entries are editorial drafts written
            from the client’s stated expertise, for layout review only. They must
            be approved or replaced before publishing under Simant’s name. No
            post claims attendance at any trade fair, and none is dated before
            the company existed — both of which an earlier draft did.
          </div>
        </div>
      </section>
    </div>
  )
}
