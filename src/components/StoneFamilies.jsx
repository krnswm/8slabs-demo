import { families, stonesIn } from '../data/stones.js'
import { whatsappLink } from '../data/site.js'
import StoneSwatch from './StoneSwatch.jsx'
import Reveal from './Reveal.jsx'

/**
 * The catalogue, led by material.
 *
 * One section per stone family: the definition (blurb + Applications +
 * Finishes) on one side, a representative set of stones on the other, and the
 * sides ALTERNATE down the page — the "definition on right and left" the
 * client asked for. Odd families read definition-left, even read
 * definition-right, which gives the page a zig-zag rhythm and stops six
 * near-identical blocks from reading as a list.
 *
 * No counts anywhere: not per family, not in total. The client explicitly does
 * not want the number of stones they deal in stated.
 *
 * A server component — no filtering state, so the whole catalogue is static
 * HTML and costs zero JavaScript.
 */
export default function StoneFamilies() {
  return (
    <div className="fams">
      {families.map((f, i) => {
        const stones = stonesIn(f.name)
        if (stones.length === 0) return null

        return (
          <section
            key={f.name}
            className="fam"
            data-flip={i % 2 === 1 ? 'true' : undefined}
            id={f.name.toLowerCase()}
            aria-labelledby={`fam-${f.name.toLowerCase()}`}
          >
            {/* ---- Definition ---- */}
            <Reveal className="fam__def">
              <span className="eyebrow">Material</span>
              <h2 id={`fam-${f.name.toLowerCase()}`}>{f.name}</h2>
              <p className="fam__blurb">{f.blurb}</p>

              <dl className="fam__spec">
                <div className="fam__spec-row">
                  <dt className="mono">Applications</dt>
                  <dd>{f.applications}</dd>
                </div>
                <div className="fam__spec-row">
                  <dt className="mono">Finishes</dt>
                  <dd>{f.finishes}</dd>
                </div>
              </dl>

              <a
                className="btn btn--ghost fam__cta"
                href={whatsappLink(
                  `Hello 8Slabs, I'd like to enquire about ${f.name.toLowerCase()}. Quantity and destination port to follow.`
                )}
                target="_blank"
                rel="noreferrer noopener"
              >
                Enquire about {f.name.toLowerCase()}
              </a>
            </Reveal>

            {/* ---- Representative stones ---- */}
            <Reveal className="fam__grid" delay={80}>
              {stones.map((s) => (
                <figure key={s.id} className="fam__stone" id={s.id}>
                  <span className="fam__stone-face">
                    <StoneSwatch swatch={s.swatch} label={s.name} variant="fam" />
                    <span className="photo-flag">Placeholder</span>
                  </span>
                  <figcaption>
                    <span className="fam__stone-name">{s.name}</span>
                    <span className="mono">{s.origin}</span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </section>
        )
      })}
    </div>
  )
}
