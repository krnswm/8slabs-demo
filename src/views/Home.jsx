import Link from 'next/link'
import { site, whatsappLink } from '../data/site.js'
import { rackStones, families, getStone } from '../data/stones.js'
import { getDictionary } from '../i18n/dictionaries.js'
import { localePath } from '../i18n/config.js'
import StoneSwatch from '../components/StoneSwatch.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * The home page body, shared by the English route (/) and every prefixed
 * locale (/es/, /ar/ …). Route files stay one-liners so the markup exists in
 * exactly one place — eight copies of a page is eight places to forget a fix.
 */
export default function Home({ locale = 'en' }) {
  const t = getDictionary(locale)
  const p = (path) => localePath(path, locale)

  return (
    <div className="page-in">
      {/* ------------------------------------------------------------ HERO
          Asymmetric editorial split on a warm dark ground: a title-block rail,
          the split, and the material range as the base. All type sits in the
          left column, which is the half the directional scrim protects. */}
      <section className="hero hero--dark">
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
          <div className="hero__top">
            <span className="mono">{t.home.crumbLeft}</span>
            <span className="mono">{t.home.crumbRight}</span>
          </div>

          <div className="hero__body">
            {/* The one cut on the site: a single saw pass across the headline. */}
            <h1 className="cut">{t.home.headline}</h1>

            <p className="hero__sub">{t.home.sub}</p>

            <div className="hero__cta">
              <a
                className="btn btn--wa"
                href={whatsappLink(t.common.whatsappGreeting)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.common.enquireWhatsapp}
              </a>
              <Link className="btn btn--light" href={p('/catalogue/')}>
                {t.common.browseCatalogue}
              </Link>
            </div>
          </div>

          {/* The range, as the hero's base — every material jumps straight to
              its own section of the catalogue. */}
          <nav className="hero__materials" aria-label={t.home.materialsNav}>
            <ul>
              {families.map((f) => (
                <li key={f.name}>
                  <Link href={`${p('/catalogue/')}#${f.name.toLowerCase()}`}>
                    {t.families[f.name]?.name || f.name}
                  </Link>
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
            <span className="eyebrow">{t.home.introEyebrow}</span>
            <h2>{t.home.introTitle}</h2>
            <div className="stack" style={{ marginTop: 'var(--s-6)' }}>
              <p>{t.home.introP1}</p>
              <p>{t.home.introP2}</p>
            </div>
            <Link
              className="link-u"
              href={p('/about/')}
              style={{ display: 'inline-block', marginTop: 'var(--s-6)' }}
            >
              {t.common.readStory}
            </Link>
          </Reveal>

          <Reveal className="split__media" delay={80}>
            <StoneSwatch
              label={getStone('teakwood').name}
              swatch={getStone('teakwood').swatch}
              variant="split"
            />
            <span className="photo-flag">{t.common.placeholderTexture}</span>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- VALUES
          Deliberately not numbered: the three commitments are a set, not a
          sequence, and numbering a set is decoration. */}
      <section className="section section--sm section--rule">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">{t.home.valuesEyebrow}</span>
            <h2>{t.home.valuesTitle}</h2>
          </div>
          <div className="grid grid--3">
            {t.values.map((v, i) => (
              <Reveal key={v.title} className="value" delay={i * 70}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CATALOGUE
          Faces sit bare with mono captions so nothing competes with the stone.
          No SKU counts anywhere — the client asked not to state how many
          stones they deal in. */}
      <section className="section section--lg section--rule">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">{t.home.collectionEyebrow}</span>
            <h2>{t.home.collectionTitle}</h2>
            <p>{t.home.collectionBody}</p>
          </div>
          <div className="grid grid--4">
            {rackStones.slice(0, 4).map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <Link href={`${p('/catalogue/')}#${s.id}`} className="face-card">
                  <span className="face-card__face">
                    <StoneSwatch swatch={s.swatch} label={s.name} variant="face" />
                    <span className="photo-flag">{t.common.placeholder}</span>
                  </span>
                  {/* Stone name and origin stay in the source language: these
                      are international trade names and place names. */}
                  <span className="face-card__name">{s.name}</span>
                  <span className="face-card__meta">
                    {t.families[s.category]?.name || s.category} · {s.origin}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 'var(--s-16)' }}>
            <Link className="btn btn--primary" href={p('/catalogue/')}>
              {t.common.viewCatalogue}
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
            <span className="photo-flag">{t.common.placeholderTexture}</span>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">{t.home.marketsEyebrow}</span>
            <h2>{t.home.marketsTitle}</h2>
            <p style={{ marginTop: 'var(--s-6)' }}>{t.home.marketsBody}</p>
            <ul className="chain" style={{ marginTop: 'var(--s-8)' }}>
              {t.markets.map((m) => (
                <li
                  key={m}
                  className="chain__item"
                  style={{ gridTemplateColumns: '1fr', paddingBlock: 'var(--s-4)' }}
                >
                  <h3 style={{ fontSize: 'var(--t-lg)', marginBottom: 0 }}>{m}</h3>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-band on-dark">
            <h2>{t.home.ctaTitle}</h2>
            <p>{t.home.ctaBody}</p>
            <div className="cta-band__btns">
              <a
                className="btn btn--wa"
                href={whatsappLink(t.common.whatsappGreeting)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.common.enquireWhatsapp}
              </a>
              <Link className="btn btn--light" href={p('/contact/')}>
                {t.home.ctaAlt}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
