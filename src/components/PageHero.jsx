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
/**
 * Background photographs, by page.
 *
 * `widths` lists only the sizes that actually exist in public/photos — the
 * import script never upscales, so asking for a width a source cannot provide
 * silently yields nothing. `tone` says whether the photograph is dark or light
 * overall, which decides how the cream veil above it is mixed.
 */
const HERO_PHOTO = {
  'texture-black-veined': { widths: [800, 1200], tone: 'dark' },
  'samples-linen':        { widths: [474],       tone: 'light' },   // 474px source — too soft for a full-bleed hero
  'texture-fantasy-brown':{ widths: [640, 960],  tone: 'light' },
  'setts-stacked':        { widths: [474],       tone: 'dark' },   // 474px source
  'granite-outcrop':      { widths: [640, 1000], tone: 'light' },
}

export default function PageHero({ crumb, meta, eyebrow, title, lead, facts = [], scrollLabel = 'Scroll', photo }) {
  const bg = photo ? HERO_PHOTO[photo] : null
  const srcSet = (fmt) =>
    bg.widths.map((w) => `/photos/${photo}-${w}.${fmt} ${w}w`).join(', ')

  return (
    <header className="phero" data-photo={photo || undefined} data-tone={bg?.tone}>
      {bg && (
        /* Decorative only: the hero says everything in text, so the photograph
           carries no information a screen reader needs. aria-hidden plus an
           empty alt, not one or the other. */
        <div className="phero__bg" aria-hidden="true">
          <picture>
            <source type="image/avif" sizes="100vw" srcSet={srcSet('avif')} />
            <source type="image/webp" sizes="100vw" srcSet={srcSet('webp')} />
            <img src={`/photos/${photo}-${bg.widths[bg.widths.length - 1]}.webp`} alt="" decoding="async" />
          </picture>
        </div>
      )}
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
