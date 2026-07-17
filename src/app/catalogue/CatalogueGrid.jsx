'use client'

import { useMemo, useState } from 'react'
import { stones, categories } from '../../data/stones.js'
import { whatsappLink } from '../../data/site.js'
import StoneSwatch from '../../components/StoneSwatch.jsx'
import Reveal from '../../components/Reveal.jsx'

export default function CatalogueGrid() {
  const [active, setActive] = useState('All')

  // Counts come from the data, so a filter can never advertise results it
  // cannot show.
  const counts = useMemo(() => {
    const map = { All: stones.length }
    for (const s of stones) map[s.category] = (map[s.category] || 0) + 1
    return map
  }, [])

  const shown = active === 'All' ? stones : stones.filter((s) => s.category === active)

  return (
    <>
      <div className="filters" role="group" aria-label="Filter stones by material">
        {categories.map((c) => (
          <button
            key={c}
            className="filter"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
            <span className="filter__count">{counts[c] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Announce the result count to screen readers without stealing focus. */}
      <p aria-live="polite" className="mono" style={{ marginBottom: 'var(--s-6)' }}>
        Showing {shown.length} of {stones.length} stones
        {active !== 'All' ? ` · ${active}` : ''}
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <h3>Nothing in this material yet</h3>
          <p>
            The catalogue is still being finalised. Ask us directly — we source
            well beyond what is listed here.
          </p>
        </div>
      ) : (
        <div className="grid grid--3">
          {shown.map((s, i) => (
            // key includes the filter so cards remount and re-reveal when the
            // set changes, rather than snapping in already-visible.
            <Reveal key={`${active}-${s.id}`} delay={Math.min(i, 6) * 60}>
              <article className="card stone-card" id={s.id}>
                <div className="stone-card__face">
                  <StoneSwatch swatch={s.swatch} label={s.name} variant="cat" />
                  <span className="photo-flag">Placeholder — not a photograph</span>
                </div>

                <div className="stone-card__body">
                  <span className="tag">{s.category}</span>
                  <h3>{s.name}</h3>
                  <p className="stone-card__blurb">{s.blurb}</p>

                  <dl className="spec">
                    <div className="spec__row">
                      <dt className="spec__k">Origin</dt>
                      <dd className="spec__v">{s.origin}</dd>
                    </div>
                    <div className="spec__row">
                      <dt className="spec__k">Finishes</dt>
                      <dd className="spec__v">{s.finishes.join(', ')}</dd>
                    </div>
                    <div className="spec__row">
                      <dt className="spec__k">Format</dt>
                      <dd className="spec__v">{s.sizes}</dd>
                    </div>
                    <div className="spec__row">
                      <dt className="spec__k">Uses</dt>
                      <dd className="spec__v">{s.applications.join(', ')}</dd>
                    </div>
                  </dl>

                  <a
                    className="btn btn--ghost"
                    style={{ marginTop: 'var(--s-6)' }}
                    href={whatsappLink(
                      `Hello 8Slabs, I'd like to enquire about ${s.name} (${s.category}). Quantity and destination port to follow.`
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Enquire about {s.name}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <div className="note" style={{ marginTop: 'var(--s-12)' }}>
        <b>Pre-launch note.</b> These are real North-Indian stone varieties
        standing in as a representative range while the final SKU list is
        confirmed (SRS §7.1 marked both the SKU count and the per-stone spec
        fields as TBD). Each face is a generated texture, not a photograph, and
        is labelled as such — a buyer must never commit to a container against
        an image that is not the material.
      </div>
    </>
  )
}
