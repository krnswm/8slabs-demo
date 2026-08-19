import PageHero from '../../components/PageHero.jsx'
import StoneFamilies from '../../components/StoneFamilies.jsx'

export const metadata = {
  title: 'Stone catalogue',
  description:
    'Granite, marble, sandstone, quartzite, limestone and slate from India — what each material is, where it performs, and the finishes it takes. Quote-only pricing, one container minimum.',
  alternates: { canonical: '/catalogue/' },
  openGraph: {
    title: 'Stone catalogue — 8Slabs',
    description:
      'Indian natural stone by material: applications, finishes and representative selections.',
  },
}

export default function Catalogue() {
  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — Catalogue"
        meta="Quote-only pricing"
        eyebrow="Catalogue"
        title="Know the material before you specify it."
        lead="What each stone family is, where it performs, and the finishes it takes — with a representative selection from each. Pricing is quoted per requirement."
        facts={[
          ['Pricing', 'Quote-only'],
          ['Minimum', '1 container'],
          ['Scope', 'B2B export'],
        ]}
      />

      <section className="section">
        <div className="container">
          <StoneFamilies />

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
