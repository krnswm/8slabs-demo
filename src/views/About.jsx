import Link from 'next/link'
import { site, whatsappLink } from '../data/site.js'
import { getStone } from '../data/stones.js'
import { getDictionary, fill } from '../i18n/dictionaries.js'
import { localePath } from '../i18n/config.js'
import StoneSwatch from '../components/StoneSwatch.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

export default function About({ locale = 'en' }) {
  const t = getDictionary(locale)
  const p = (path) => localePath(path, locale)

  return (
    <div className="page-in">
      <PageHero
        crumb={t.about.crumb}
        meta={fill(t.about.metaLine, { year: site.established })}
        eyebrow={t.about.eyebrow}
        title={t.about.heroTitle}
        lead={t.about.heroLead}
        facts={[
          [t.about.factFounded, site.established],
          [t.about.factBase, t.about.factBaseValue],
          [t.about.factModel, t.about.factModelValue],
        ]}
        scrollLabel={t.common.scroll}
      />

      {/* ---------------------------------------------------------- STORY
          The framing matters: the company is new, the person is not. The trust
          story leans on a verifiable personal track record rather than
          implying a corporate history that does not exist. */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">{t.about.storyEyebrow}</span>
            <h2>{t.about.storyTitle}</h2>
            <div className="stack" style={{ marginTop: 'var(--s-6)' }}>
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
              <p>{t.about.storyP3}</p>
              <p>{t.about.storyP4}</p>
              <p>{t.about.storyP5}</p>
              <p>{t.about.storyP6}</p>
              <p>{t.about.storyP7}</p>
            </div>
          </Reveal>

          <Reveal className="split__media" delay={80}>
            <StoneSwatch
              label={getStone('rainbow').name}
              swatch={getStone('rainbow').swatch}
              variant="split"
            />
            <span className="photo-flag">{t.common.placeholderTexture}</span>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- SUPPLY CHAIN
          The one numbered list on the site. Numbering earns its place because
          these steps happen in this order and the order is the argument:
          inspection comes before packing. */}
      <section className="section section--sunk">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">{t.about.chainEyebrow}</span>
            <h2>{t.about.chainTitle}</h2>
            <p>{t.about.chainBody}</p>
          </div>
          <ol className="chain">
            {t.supplyChain.map((s, i) => (
              <Reveal as="li" key={s.step} className="chain__item" delay={i * 60}>
                <span className="chain__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.step}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- VALUES */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">{t.about.valuesEyebrow}</span>
            <h2>{t.about.valuesTitle}</h2>
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

      {/* ----------------------------------------------------------- TEAM
          SRS §7.3 answered "Y" to leadership profiles but supplied no names or
          photos. Rather than inventing a team, the page states what it knows
          and leaves an honest gap. */}
      <section className="section section--sunk">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">{t.about.teamEyebrow}</span>
            <h2>{t.about.teamTitle}</h2>
          </div>
          <div className="grid grid--2">
            <Reveal className="card" style={{ padding: 'var(--s-8)' }}>
              <h3>{site.legalName}</h3>
              <p className="mono" style={{ marginTop: 'var(--s-2)' }}>
                {t.about.founderRole}
              </p>
              <p style={{ marginTop: 'var(--s-4)' }}>{t.about.founderBio}</p>
            </Reveal>
            <Reveal className="note" delay={80} style={{ alignSelf: 'start' }}>
              <b>To confirm before launch.</b> The SRS marks leadership profiles
              as required but no names, roles or photographs were supplied.
              Send them and they drop straight into this grid. Nothing here is
              invented — an empty slot is better than a fictional colleague.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="cta-band on-dark">
            <h2>{t.about.ctaTitle}</h2>
            <p>{t.about.ctaBody}</p>
            <div className="cta-band__btns">
              <a
                className="btn btn--wa"
                href={whatsappLink(t.common.whatsappGreeting)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.common.enquireWhatsapp}
              </a>
              <Link className="btn btn--light" href={p('/catalogue/')}>
                {t.about.ctaAlt}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
