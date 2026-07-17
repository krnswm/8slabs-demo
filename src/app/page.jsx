import Link from 'next/link'
import { site, whatsappLink } from '../data/site.js'
import { stones, rackStones, getStone } from '../data/stones.js'
import { posts } from '../data/posts.js'
import SlabRack from '../components/SlabRack.jsx'
import StoneSwatch from '../components/StoneSwatch.jsx'
import Reveal from '../components/Reveal.jsx'

export const metadata = {
  title: `${site.brand} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: '/' },
}

export default function Home() {
  const latest = posts.slice(0, 3)

  return (
    <div className="page-in">
      {/* ------------------------------------------------------------ HERO
          The thesis: eight slabs racked on edge, the way a buyer actually
          meets stone. The headline names the fear the buyer arrives with —
          that what lands is not what was specified — rather than selling. */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">Natural stone export · Jaipur, India</span>
            {/* The one cut on the site: a single saw pass across the headline. */}
            <h1 className="cut">The stone you specified, in the container you were promised.</h1>
            <p className="hero__sub">
              Sandstone, limestone, quartzite and slate from North India’s stone
              belt — sourced, inspected and shipped by someone who has been doing
              it for a decade.
            </p>
            <div className="hero__cta">
              <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                Enquire on WhatsApp
              </a>
              <Link className="btn btn--ghost" href="/catalogue/">Browse the catalogue</Link>
            </div>
            <div className="hero__spec">
              <span><b>{rackStones.length}</b> signature stones</span>
              <span><b>{stones.length}</b> in the catalogue</span>
              <span><b>1</b> container minimum</span>
              <span><b>Quote</b>-only pricing</span>
            </div>
          </div>

          <SlabRack />
        </div>
      </section>

      {/* ---------------------------------------------------------- INTRO */}
      <section className="section section--rule">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2>One person accountable for the whole chain.</h2>
            <div className="stack" style={{ marginTop: 'var(--s-6)' }}>
              <p>
                8Slabs is Simant Vijai. A decade inside one of India’s leading
                natural stone export companies, spent on international business,
                quality assurance and the customer relationships that outlast any
                single order.
              </p>
              <p>
                That means the person who selects your material is the person who
                inspects it, chases the production window and answers the phone
                when you need to know where the container is. Nothing is handed
                to a desk that has never seen the quarry.
              </p>
            </div>
            <Link className="link-u" href="/about/" style={{ display: 'inline-block', marginTop: 'var(--s-6)' }}>
              Read the full story
            </Link>
          </Reveal>

          <Reveal className="split__media" delay={80}>
            <StoneSwatch
              label={getStone('teakwood').name}
              swatch={getStone('teakwood').swatch}
              variant="split"
            />
            <span className="photo-flag">Placeholder texture</span>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- VALUES
          The client's own three differentiators (SRS §3). Deliberately not
          numbered: "clear communication / fair pricing / quality driven" is a
          set, not a sequence, and numbering a set is decoration. */}
      <section className="section section--sm section--rule">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Why 8Slabs</span>
            <h2>Three commitments, and what they cost us to keep.</h2>
          </div>
          <div className="grid grid--3">
            {site.values.map((v, i) => (
              <Reveal key={v.title} className="value" delay={i * 70}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CATALOGUE
          The one dark band on the site, and the one section that gets --lg
          spacing. Both are spent here on purpose: this is the page's whole
          job. On cream, stone reads as a swatch; against near-black it reads
          as material. No white cards — the faces sit bare on the dark with
          mono captions, so nothing competes with the stone. */}
      <section className="section section--lg section--dark">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">The collection</span>
            <h2>Read the face before you commit a container.</h2>
            <p>
              Every stone carries its origin, finishes, thicknesses and
              applications. Pricing is per requirement — send the material,
              quantity and destination port and you get a real number back.
            </p>
          </div>
          <div className="grid grid--4">
            {rackStones.slice(0, 4).map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <Link href={`/catalogue/#${s.id}`} className="face-card">
                  <span className="face-card__face">
                    <StoneSwatch swatch={s.swatch} label={s.name} variant="face" />
                    <span className="photo-flag">Placeholder</span>
                  </span>
                  <span className="face-card__name">{s.name}</span>
                  <span className="face-card__meta">{s.category} · {s.origin}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 'var(--s-16)' }}>
            <Link className="btn btn--light" href="/catalogue/">
              All {stones.length} stones
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- WHO */}
      <section className="section section--rule">
        <div className="container split">
          <Reveal className="split__media" style={{ aspectRatio: '5 / 4' }}>
            <StoneSwatch
              label={getStone('kota-blue').name}
              swatch={getStone('kota-blue').swatch}
              variant="split"
            />
            <span className="photo-flag">Placeholder texture</span>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Who we work with</span>
            <h2>Built for professional buyers.</h2>
            <p style={{ marginTop: 'var(--s-6)' }}>
              8Slabs is business-to-business only. The minimum is one container
              load, and the people on the other end of the call already know what
              they are specifying.
            </p>
            <ul className="chain" style={{ marginTop: 'var(--s-8)' }}>
              {site.markets.map((m) => (
                <li key={m} className="chain__item" style={{ gridTemplateColumns: '1fr', paddingBlock: 'var(--s-4)' }}>
                  <h3 style={{ fontSize: 'var(--t-lg)', marginBottom: 0 }}>{m}</h3>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- JOURNAL */}
      <section className="section section--sm section--rule">
        <div className="container">
          <div className="sec-head" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">Journal</span>
              <h2>Material guides and shipping notes.</h2>
            </div>
            <Link className="btn btn--ghost" href="/journal/">All entries</Link>
          </div>
          <div className="grid grid--3">
            {latest.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="card">
                  <div className="post-card__face">
                    <StoneSwatch swatch={p.swatch} label={p.title} variant="post" />
                  </div>
                  <div className="post-card__body">
                    <span className="mono">{p.kind} · {p.dateLabel} · {p.readMins} min</span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-band on-dark">
            <h2>Tell us what you need to land.</h2>
            <p>
              Material, quantity and destination port is enough to start. You get
              availability, finishes and a plan for the container — usually the
              same day.
            </p>
            <div className="cta-band__btns">
              <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                Enquire on WhatsApp
              </a>
              <Link className="btn btn--light" href="/contact/">Other ways to reach us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
