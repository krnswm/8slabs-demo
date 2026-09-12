/**
 * The landing hero for every interior page — a typographic, full-height
 * composition. One structure across About / Catalogue / Journal / Contact.
 *
 *   ┌ crumb ─────────────────────────────────────────── meta ┐   where you are
 *   │                                                         │
 *   │  eyebrow                                                │
 *   │  BIG HEADLINE                                           │   the statement,
 *   │  lead paragraph                                         │   large, carrying
 *   │                                                         │   the whole hero
 *   │                                                         │
 *   ├ fact  fact  fact ───────────────────────────── Scroll ─ ┤   the spec bar
 *   └─────────────────────────────────────────────────────────┘
 *
 * No image panel and no filler index — the hero is carried by the real content
 * alone. It reads premium because the headline is large and confident and the
 * negative space around it is deliberate; the full-width context line and spec
 * footer frame that space so it feels composed, not empty.
 */
export default function PageHero({ crumb, meta, eyebrow, title, lead, facts = [], scrollLabel = 'Scroll' }) {
  return (
    <header className="phero">
      <div className="container phero__inner">
        <div className="phero__top">
          <span className="mono">{crumb}</span>
          {meta ? <span className="mono">{meta}</span> : null}
        </div>

        <div className="phero__lead">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
        </div>

        <div className="phero__foot">
          {facts.length > 0 && (
            <dl className="phero__facts">
              {facts.map(([k, v]) => (
                <div key={k} className="phero__fact">
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <span className="phero__cue" aria-hidden="true">{scrollLabel}</span>
        </div>
      </div>
    </header>
  )
}
