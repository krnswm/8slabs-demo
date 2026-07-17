import { stones } from '../../data/stones.js'
import PageHero from '../../components/PageHero.jsx'
import CatalogueGrid from './CatalogueGrid.jsx'

export const metadata = {
  title: 'Stone catalogue',
  description:
    'Sandstone, limestone, quartzite, slate, marble and granite from North India — origin, finishes, thicknesses and applications for each. Quote-only pricing, one container minimum.',
  alternates: { canonical: '/catalogue/' },
  openGraph: {
    title: 'Stone catalogue — 8Slabs',
    description:
      'Indian natural stone with full specifications: origin, finishes, thicknesses and applications.',
  },
}

export default function Catalogue() {
  return (
    <div className="page-in">
      <PageHero
        crumb="8Slabs — Catalogue"
        meta={`${stones.length} stones`}
        eyebrow="Catalogue"
        title="Every stone, with the numbers that decide it."
        lead="Origin, available finishes, thickness range and the applications each material is actually suited to. Pricing is quoted per requirement."
        facts={[
          ['Stones', stones.length],
          ['Pricing', 'Quote-only'],
          ['Minimum', '1 container'],
        ]}
      />

      <section className="section">
        <div className="container">
          <CatalogueGrid />
        </div>
      </section>
    </div>
  )
}
