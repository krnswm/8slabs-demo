import { site, whatsappLink, telLink, mailLink } from '../../data/site.js'
import PageHero from '../../components/PageHero.jsx'
import Reveal from '../../components/Reveal.jsx'

export const metadata = {
  title: 'Contact',
  description:
    'Reach 8Slabs on WhatsApp, phone or email. Send the material, quantity and destination port and get availability, finishes and a plan for your container.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact — 8Slabs',
    description: 'WhatsApp, call or email 8Slabs — Jaipur, Rajasthan, India.',
  },
}

/* Icons: single family, consistent 1.5px stroke, 20px box. */
const icons = {
  whatsapp: (
    <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49 2.98 1.29 2.98.86 3.52.8.54-.05 1.75-.71 2-1.4.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34z" />
  ),
  phone: (
    <path d="M4 5c0-.55.45-1 1-1h2.2c.45 0 .84.3.96.73l.9 3.2c.1.38-.02.79-.32 1.05L7.2 10.3a12.5 12.5 0 0 0 6.5 6.5l1.32-1.54c.26-.3.67-.42 1.05-.31l3.2.9c.43.12.73.51.73.96V19c0 .55-.45 1-1 1h-1C9.82 20 4 14.18 4 7V5z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
}

function Icon({ name, filled = false }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      {icons[name]}
    </svg>
  )
}

export default function Contact() {
  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — Contact"
        meta="B2B enquiries"
        eyebrow="Contact"
        title="Message us. You will get a person."
        lead="Send the material, the quantity and the destination port. That is enough for a real answer on availability, finishes and lead time."
        facts={[
          ['Fastest', 'WhatsApp'],
          ['Reply', 'Same day'],
          ['Scope', 'B2B only'],
        ]}
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <h2>Direct lines</h2>
            <p style={{ marginTop: 'var(--s-4)' }}>
              WhatsApp is the fastest — it is where the business actually runs.
            </p>

            <div style={{ marginTop: 'var(--s-8)' }}>
              <a className="contact-row" href={whatsappLink()} target="_blank" rel="noreferrer noopener">
                <span className="contact-row__icon"><Icon name="whatsapp" filled /></span>
                <span>
                  <span className="contact-row__k">WhatsApp — fastest</span>
                  <span className="contact-row__v">{site.phone}</span>
                </span>
              </a>

              <a className="contact-row" href={telLink}>
                <span className="contact-row__icon"><Icon name="phone" filled /></span>
                <span>
                  <span className="contact-row__k">Phone</span>
                  <span className="contact-row__v">{site.phone}</span>
                </span>
              </a>

              <a className="contact-row" href={mailLink}>
                <span className="contact-row__icon"><Icon name="mail" /></span>
                <span>
                  <span className="contact-row__k">Email</span>
                  <span className="contact-row__v">{site.email}</span>
                </span>
              </a>

              {/* Physical address removed per client feedback ("Lets just give
                  watsapp and no address"). Still in src/data/site.js if needed. */}
            </div>

            <a
              className="btn btn--wa"
              style={{ marginTop: 'var(--s-8)' }}
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open WhatsApp
            </a>
          </Reveal>

          {/* SRS §8: the client declined a web RFQ form (N) and chose
              click-to-WhatsApp (Y). So there is no form here — building one
              would contradict a decision they already made, and a form with no
              backend is worse than no form at all. */}
          <Reveal delay={80}>
            <div className="card" style={{ padding: 'var(--s-8)' }}>
              <h3>What to include</h3>
              <p style={{ marginTop: 'var(--s-4)' }}>
                You will get a faster, more useful answer if the first message
                covers:
              </p>
              <ul className="chain" style={{ marginTop: 'var(--s-6)' }}>
                {[
                  ['Material', 'Which stone, and the finish if you know it.'],
                  ['Quantity', 'Volume or container count. The minimum is one container load.'],
                  ['Destination', 'Port of discharge — it drives freight and lead time.'],
                  ['Timeline', 'When it needs to land, not when it needs to ship.'],
                ].map(([k, v], i) => (
                  <li key={k} className="chain__item" style={{ paddingBlock: 'var(--s-4)' }}>
                    <span className="chain__n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 style={{ fontSize: 'var(--t-base)', marginBottom: 'var(--s-1)' }}>{k}</h3>
                      <p>{v}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mono" style={{ marginTop: 'var(--s-6)', textTransform: 'none', letterSpacing: '0.03em' }}>
                Business-to-business only · Pricing quoted per requirement
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
