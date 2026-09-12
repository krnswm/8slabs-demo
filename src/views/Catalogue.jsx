import { getDictionary } from '../i18n/dictionaries.js'
import PageHero from '../components/PageHero.jsx'
import StoneFamilies from '../components/StoneFamilies.jsx'

export default function Catalogue({ locale = 'en' }) {
  const t = getDictionary(locale)

  return (
    <div className="page-in">
      <PageHero
        photo="setts-stacked"
        crumb={t.catalogue.crumb}
        meta={t.catalogue.metaLine}
        eyebrow={t.catalogue.eyebrow}
        title={t.catalogue.heroTitle}
        lead={t.catalogue.heroLead}
        facts={[
          [t.catalogue.factPricing, t.catalogue.factPricingValue],
          [t.catalogue.factMinimum, t.catalogue.factMinimumValue],
          [t.catalogue.factScope, t.catalogue.factScopeValue],
        ]}
        scrollLabel={t.common.scroll}
      />

      <section className="section">
        <div className="container">
          <StoneFamilies locale={locale} />

          <div className="note" style={{ marginTop: 'var(--s-16)' }}>
            <b>Pre-launch note.</b> Stone faces are generated textures, not
            photographs, and are labelled as such — a buyer must never commit to
            a container against an image that is not the material. Material
            descriptions for granite are the client’s own; the other five are
            drafts awaiting sign-off. The stones shown are a representative
            selection, not a fixed range.
          </div>
        </div>
      </section>
    </div>
  )
}
