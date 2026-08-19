import { reels } from '../../data/socials.js'
import { site, whatsappLink } from '../../data/site.js'
import PageHero from '../../components/PageHero.jsx'
import StoneSwatch from '../../components/StoneSwatch.jsx'
import Reveal from '../../components/Reveal.jsx'

export const metadata = {
  title: 'Socials',
  description:
    'Reels from the quarry floor, the processor and the loading bay — how 8Slabs material is cut, finished, inspected and shipped.',
  alternates: { canonical: '/socials/' },
  openGraph: {
    title: 'Socials — 8Slabs',
    description: 'Reels from the quarry, the processor and the loading bay.',
  },
}

export default function Socials() {
  const ig = site.instagram

  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — Socials"
        meta={ig.handle}
        eyebrow="Socials"
        title="The work, as it happens."
        lead="Reels from the quarry face, the processor and the loading bay — the material and the checks behind every container."
        facts={[
          ['Channel', 'Instagram'],
          ['Shows', 'Quarry · Factory · Despatch'],
        ]}
      />

      <section className="section">
        <div className="container">
          {/* Reel wall. 9:16 cards — the shape reels actually are, so the
              layout is right the moment real thumbnails replace these. */}
          <div className="reels">
            {reels.map((r, i) => (
              <Reveal key={r.id} delay={Math.min(i, 6) * 60}>
                <figure className="reel reel--lg">
                  <span className="reel__face">
                    <StoneSwatch swatch={r.swatch} label={r.caption} variant="reel" />
                    <span className="reel__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                    <span className="photo-flag">Placeholder</span>
                  </span>
                  <figcaption className="reel__cap">
                    <span className="mono">{r.tag}</span>
                    <span className="reel__text">{r.caption}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* The follow CTA. Until the real account exists there is nothing
              honest to link to, so it degrades to a WhatsApp prompt rather
              than a dead or invented Instagram URL. */}
          <Reveal className="cta-band on-dark" style={{ marginTop: 'var(--s-16)' }}>
            <h2>Follow the material.</h2>
            <p>
              New cuts, finishes and loading days as they happen.
            </p>
            <div className="cta-band__btns">
              {ig.url ? (
                <a className="btn btn--light" href={ig.url} target="_blank" rel="noreferrer noopener">
                  Follow {ig.handle} on Instagram
                </a>
              ) : (
                <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                  Enquire on WhatsApp
                </a>
              )}
            </div>
          </Reveal>

          <div className="note" style={{ marginTop: 'var(--s-12)' }}>
            <b>Pre-launch note.</b> These reels are placeholders for layout
            review — the Instagram account has not been supplied yet, so nothing
            here links out and no view or follower counts are shown. Send the
            handle and we will wire the real feed in; the layout is already the
            right shape for it.
          </div>
        </div>
      </section>
    </div>
  )
}
