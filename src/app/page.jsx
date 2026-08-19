import Link from 'next/link'
import { site, whatsappLink } from '../data/site.js'
import { rackStones, families, getStone } from '../data/stones.js'
import { reels } from '../data/socials.js'
import StoneSwatch from '../components/StoneSwatch.jsx'
import Reveal from '../components/Reveal.jsx'

export const metadata = {
  title: `${site.brand} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: '/' },
}

export default function Home() {
  const featuredReels = reels.slice(0, 4)

  return (
    <div className="page-in">
      {/* ------------------------------------------------------------ HERO
          Asymmetric editorial split on a warm dark ground.

          Three bands over one viewport: a title-block rail, the split
          (headline left / copy + actions right), and the material range as the
          base. The rack is gone at the client's request, so the range does the
          structural work a decorative graphic was doing — with the advantage
          of being real, navigable content.

          All copy in this section is the client's own, verbatim. */}
      <section className="hero hero--dark">
        {/* The photograph, full-bleed, with the scrim stack over it.
            Decorative: the headline already says what the business is, so the
            image carries no information a screen reader needs — hence alt="". */}
        <div className="hero__media" aria-hidden="true">
          <picture>
            <source
              type="image/avif"
              sizes="100vw"
              srcSet="/hero-640.avif 640w, /hero-1024.avif 1024w, /hero-1536.avif 1536w"
            />
            <source
              type="image/webp"
              sizes="100vw"
              srcSet="/hero-640.webp 640w, /hero-1024.webp 1024w, /hero-1536.webp 1536w"
            />
            <img
              src="/hero-1536.webp"
              alt=""
              width="1536"
              height="1024"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>

        <div className="container hero__inner">
          {/* Title block — where you are, set like the header of a drawing. */}
          <div className="hero__top">
            <span className="mono">Natural stone export</span>
            <span className="mono">Jaipur, India</span>
          </div>

          {/* All type sits in the left column. Measured against the actual
              photograph, its highlights need ~78% black under text — applied
              flat that would erase the image, so the scrim is directional and
              the right half is left clear for the stone to show. */}
          <div className="hero__body">
            {/* The one cut on the site: a single saw pass across the headline. */}
            <h1 className="cut">
              India’s Natural Stone. Sourced with Experience. Delivered with
              Confidence.
            </h1>

            <p className="hero__sub">
              Sandstone, limestone, quartzite, slate, marble and granite —
              sourced from India’s leading stone regions, carefully inspected
              and shipped with a decade of hands-on industry experience.
            </p>

            <div className="hero__cta">
              <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                Enquire on WhatsApp
              </a>
              <Link className="btn btn--light" href="/catalogue/">
                Browse the catalogue
              </Link>
            </div>
          </div>

          {/* The range, as the hero's base — every material jumps straight to
              its own section of the catalogue. */}
          <nav className="hero__materials" aria-label="Stone materials">
            <ul>
              {families.map((f) => (
                <li key={f.name}>
                  <Link href={`/catalogue/#${f.name.toLowerCase()}`}>{f.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---------------------------------------------------------- INTRO */}
      <section className="section section--rule">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            {/* Client's own copy, verbatim. */}
            <h2>You specify the stone. We take care of the rest.</h2>
            <div className="stack" style={{ marginTop: 'var(--s-6)' }}>
              <p>
                We connect international buyers with reliable quarries,
                processors and stone manufacturers across India, helping you
                source the right material, achieve consistent quality and keep
                every shipment on schedule.
              </p>
              <p>
                You specify the stone. We take care of the sourcing, quality and
                delivery.
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
          Cream, not dark: per client feedback the dark is now spent on the
          hero and the closing band, with a light middle. Faces sit bare with
          mono captions so nothing competes with the stone. No SKU counts
          anywhere — the client asked not to state how many stones we deal in. */}
      <section className="section section--lg section--rule">
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
            <Link className="btn btn--primary" href="/catalogue/">
              View the full catalogue
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

      {/* --------------------------------------------------------- SOCIALS
          Replaces the Journal, per client feedback. Reels are placeholders
          until the Instagram account is supplied. */}
      <section className="section section--sm section--rule">
        <div className="container">
          <div className="sec-head" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">Socials</span>
              <h2>From the quarry floor.</h2>
            </div>
            <Link className="btn btn--ghost" href="/socials/">See all reels</Link>
          </div>
          <div className="grid grid--4">
            {featuredReels.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <Link href="/socials/" className="reel">
                  <span className="reel__face">
                    <StoneSwatch swatch={r.swatch} label={r.caption} variant="reel" />
                    <span className="reel__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                    <span className="photo-flag">Placeholder</span>
                  </span>
                  <span className="reel__cap">{r.caption}</span>
                </Link>
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
