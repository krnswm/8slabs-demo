import { families, stonesIn } from '../data/stones.js'
import { whatsappLink } from '../data/site.js'
import { getDictionary, fill } from '../i18n/dictionaries.js'
import StoneSwatch from './StoneSwatch.jsx'
import CarouselAutoplay from './CarouselAutoplay.jsx'
import Reveal from './Reveal.jsx'

/**
 * The catalogue, led by material.
 *
 * One section per stone family: the definition (blurb + Applications +
 * Finishes) on one side, a representative set of stones on the other, sides
 * ALTERNATING down the page — the "definition on right and left" the client
 * asked for.
 *
 * No counts anywhere: not per family, not in total. The client explicitly does
 * not want the number of stones they deal in stated.
 *
 * A server component — no filtering state, so the whole catalogue is static
 * HTML and costs zero JavaScript.
 */
export default function StoneFamilies({ locale = 'en' }) {
  const t = getDictionary(locale)

  return (
    <div className="fams">
      {families.map((f, i) => {
        const stones = stonesIn(f.name)
        if (stones.length === 0) return null

        /* Copy comes from the dictionary; src/data/stones.js stays the single
           source for WHICH families exist and which stones sit in them. */
        const copy = t.families[f.name] || {
          name: f.name,
          blurb: f.blurb,
          applications: f.applications,
          finishes: f.finishes,
        }
        const slug = f.name.toLowerCase()

        return (
          <section
            key={f.name}
            className="fam"
            data-flip={i % 2 === 1 ? 'true' : undefined}
            id={slug}
            aria-labelledby={`fam-${slug}`}
          >
            <Reveal className="fam__def">
              <span className="eyebrow">{t.common.material}</span>
              <h2 id={`fam-${slug}`}>{copy.name}</h2>
              <p className="fam__blurb">{copy.blurb}</p>

              <dl className="fam__spec">
                <div className="fam__spec-row">
                  <dt className="mono">{t.common.applications}</dt>
                  <dd>{copy.applications}</dd>
                </div>
                <div className="fam__spec-row">
                  <dt className="mono">{t.common.finishes}</dt>
                  <dd>{copy.finishes}</dd>
                </div>
              </dl>

              <a
                className="btn btn--ghost fam__cta"
                href={whatsappLink(
                  fill(t.common.whatsappMaterial, { material: copy.name })
                )}
                target="_blank"
                rel="noreferrer noopener"
              >
                {fill(t.common.enquireAbout, { material: copy.name })}
              </a>
            </Reveal>

            {/* Stone names and origins are NOT translated: they are
                international trade names and place names, ordered by those
                names in every market. */}
            {/* A carousel on phones, a grid on desktop — one element, switched
                in CSS. `tabIndex` because the children are <figure>, which
                nothing can focus: without it a keyboard user cannot reach the
                stones that start off-screen. On the home page the equivalent
                cards are links, so the browser scrolls them into view on Tab
                and no extra stop is needed there. */}
            <Reveal
              className="fam__grid carousel"
              delay={80}
              id={`rail-${slug}`}
              role="group"
              tabIndex={0}
              aria-labelledby={`fam-${slug}`}
            >
              {stones.map((s) => (
                <figure key={s.id} className="fam__stone" id={s.id}>
                  <span className="fam__stone-face">
                    <StoneSwatch swatch={s.swatch} label={s.name} variant="fam" />
                    <span className="photo-flag">{t.common.placeholder}</span>
                  </span>
                  <figcaption>
                    <span className="fam__stone-name">{s.name}</span>
                    <span className="mono">{s.origin}</span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
            <CarouselAutoplay
              targetId={`rail-${slug}`}
              pauseLabel={t.common.pauseMotion}
              playLabel={t.common.playMotion}
            />
          </section>
        )
      })}
    </div>
  )
}
