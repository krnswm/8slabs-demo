import Link from 'next/link'
import { site, whatsappLink } from '../../data/site.js'
import { getStone } from '../../data/stones.js'
import StoneSwatch from '../../components/StoneSwatch.jsx'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/Reveal.jsx'

export const metadata = {
  title: 'About',
  description:
    'A decade in Indian natural stone export — sourcing, quality assurance and the quarry and processor relationships behind every container 8Slabs ships.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About — 8Slabs',
    description:
      'A decade in Indian natural stone export — the relationships and quality checks behind every container.',
  },
}

export default function About() {
  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — About"
        meta={`Est. ${site.established} · Jaipur`}
        eyebrow="About"
        title="A decade of the stone belt, in one pair of hands."
        lead="8Slabs was founded in 2026. The experience behind it is considerably older."
        facts={[
          ['Founded', site.established],
          ['Base', 'Jaipur, India'],
          ['Model', 'B2B export'],
        ]}
      />

      {/* ---------------------------------------------------------- STORY
          Note the framing: the company is new, the person is not. The trust
          story leans on a verifiable personal track record rather than
          implying a corporate history that does not exist. */}
      <section className="section">
        <div className="container split">
          {/* Client's own copy, verbatim from their feedback document. */}
          <Reveal>
            <span className="eyebrow">The short version</span>
            <h2>Ten Years Learning What Goes Wrong</h2>
            <div className="stack" style={{ marginTop: 'var(--s-6)' }}>
              <p>
                I spent the last decade with one of India’s leading natural stone
                export companies, working across international business, customer
                relationships, and quality assurance. That is where you learn
                what actually goes wrong with a container—and it is rarely the
                stone itself.
              </p>
              <p>
                It is a batch that drifts from the approved sample. A finish
                agreed on a call but never written down. A production schedule
                that quietly slips by three weeks before anyone says so. Every
                one of these is a communication failure wearing a technical
                costume.
              </p>
              <p>8Slabs exists to close that gap.</p>
              <p>
                My knowledge spans North India’s stone belt—sandstone, limestone,
                quartzite, slate, and the regional materials around them—as well
                as the full supply chain: identifying the right material,
                sourcing from processors I have worked with for years,
                maintaining quality, and getting it onto the ship on the date I
                committed to.
              </p>
              <p>
                I believe long-term business is built on trust, transparency, and
                keeping commitments. These are not slogans on a wall here; they
                are the foundation of how I work.
              </p>
              <p>
                As a one-person operation, I do not have a large team or layers
                of management to hide behind. What I have is experience,
                relationships, accountability, and a commitment to do what I say
                I will do.
              </p>
              <p>That is what 8Slabs is built on.</p>
            </div>
          </Reveal>

          <Reveal className="split__media" delay={80}>
            <StoneSwatch
              label={getStone('rainbow').name}
              swatch={getStone('rainbow').swatch}
              variant="split"
            />
            <span className="photo-flag">Placeholder texture</span>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- SUPPLY CHAIN
          The one numbered list on the site. Numbering earns its place here
          because these steps happen in this order and the order is the point:
          inspection before packing is the whole argument. */}
      <section className="section section--sunk">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Quarry to delivery</span>
            <h2>Where a container is won or lost.</h2>
            <p>
              Five stages. The third one is where most problems are caught, and
              the second is where most problems are created.
            </p>
          </div>
          <ol className="chain">
            {site.supplyChain.map((s, i) => (
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
            <span className="eyebrow">How we work</span>
            <h2>Three commitments.</h2>
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

      {/* ----------------------------------------------------------- TEAM
          SRS §7.3 answered "Y" to leadership profiles but supplied no names or
          photos. Rather than inventing a team, the page states what it knows
          and leaves an honest gap. */}
      <section className="section section--sunk">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Leadership</span>
            <h2>Who you will actually be talking to.</h2>
          </div>
          <div className="grid grid--2">
            <Reveal className="card" style={{ padding: 'var(--s-8)' }}>
              <h3>{site.legalName}</h3>
              <p className="mono" style={{ marginTop: 'var(--s-2)' }}>Founder</p>
              <p style={{ marginTop: 'var(--s-4)' }}>
                Ten years in Indian natural stone export, across international
                business, customer relationships and quality assurance. Handles
                sourcing, inspection and every enquiry personally.
              </p>
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
            <h2>Start with a material and a port.</h2>
            <p>That is genuinely enough for a useful first answer.</p>
            <div className="cta-band__btns">
              <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                Enquire on WhatsApp
              </a>
              <Link className="btn btn--light" href="/catalogue/">See the catalogue</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
