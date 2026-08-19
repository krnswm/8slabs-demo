/**
 * Interim brand mark: eight stacked rules — the eight slabs, edge-on.
 *
 * TODO(client): SRS §7.3 confirmed no vector logo exists yet ("NA"). This is a
 * placeholder built from the brand name so the site is not shipping an empty
 * corner. Replace with the real SVG/AI/EPS the moment it exists; do not treat
 * this as the identity.
 */
export default function BrandMark({ className = '', size = 34 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Colours come from tokens so the mark can invert with its surroundings
          (see --mark-plate / --mark-bar). On the dark nav a near-black plate
          would vanish into the glass. */}
      <rect width="34" height="34" rx="2" fill="var(--mark-plate, var(--c-heading))" />
      {/* Eight slabs, the middle two in accent — the pair being inspected. */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={5 + i * 3}
          y={i === 3 || i === 4 ? 7 : 9}
          width="1.6"
          height={i === 3 || i === 4 ? 20 : 16}
          rx="0.4"
          fill={i === 3 || i === 4 ? 'var(--c-accent)' : 'var(--mark-bar, var(--c-border))'}
        />
      ))}
    </svg>
  )
}
