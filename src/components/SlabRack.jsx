import Link from 'next/link'
import StoneSwatch from './StoneSwatch.jsx'
import { rackStones } from '../data/stones.js'

/**
 * THE RACK — the signature element.
 *
 * Eight slabs standing on edge, which is how slabs are actually stored in a
 * yard: never stacked flat, always racked upright on an A-frame so a buyer can
 * walk the row and pull one out to read its face. Hovering pulls a slab
 * forward and gives it room; the neighbours yield rather than the row
 * reflowing. That gesture is the whole business in one interaction — and the
 * "8" in 8Slabs stops being a name and becomes the thing you look at.
 *
 * Deliberately a server component: the entrance stagger and the pull-forward
 * are pure CSS, so the most expressive thing on the site costs zero JavaScript
 * and works before hydration.
 */
export default function SlabRack() {
  return (
    <ul className="rack" aria-label="Eight signature stones from the catalogue">
      {rackStones.map((stone, i) => (
        <li
          key={stone.id}
          className="rack__slab"
          style={{ '--slab-delay': `${i * 70}ms`, '--slab-i': i - 3.5 }}
        >
          <Link href={`/catalogue/#${stone.id}`} className="rack__link">
            <StoneSwatch className="rack__face" swatch={stone.swatch} label={stone.name} variant="rack" />
            <span className="rack__label">
              <span className="rack__name">{stone.name}</span>
              <span className="rack__meta">{stone.category}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
