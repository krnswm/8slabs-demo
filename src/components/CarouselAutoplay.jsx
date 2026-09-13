'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Drives an existing `.carousel` scroller: slow continuous auto-scroll that
 * loops forever, and gets out of the way the instant anyone touches it.
 *
 * It attaches to an element already in the page rather than wrapping one,
 * because `.fam__grid` carries the alternating `order` that flips the
 * catalogue layout every other family. Wrapping it in another div would move
 * that ordering onto the wrapper and break the rhythm down the page.
 *
 * The loop is made by cloning the items ONCE, in the DOM, after mount. Cloning
 * in JSX instead would put every stone in the static HTML twice — duplicate
 * `id`s, which is invalid, and which would also break the `#kandla-grey`
 * anchors the footer links to. The clone is a client-side decoration: it is
 * aria-hidden, its focusables are pulled out of the tab order, and search
 * engines never see it.
 *
 * Auto-motion is a real accessibility hazard, so it stops for all of:
 *   · prefers-reduced-motion — never starts at all
 *   · pointer over it, or focus inside it
 *   · any manual scroll, for a few seconds afterwards
 *   · the carousel being off-screen, or the tab being in the background
 *   · the explicit Pause button, which WCAG 2.2.2 requires for anything that
 *     moves by itself for more than five seconds
 */

/** Pixels per second. Slow on purpose: this is a material you look at. */
const SPEED = 22
/** How long to leave it alone after someone scrolls it themselves. */
const RESUME_AFTER = 3500

export default function CarouselAutoplay({ targetId, pauseLabel, playLabel }) {
  const [paused, setPaused] = useState(false)   // the button's state only
  const [ready, setReady] = useState(false)
  const held = useRef(false)                    // transient: hover, focus, touch
  const untilRef = useRef(0)                    // ignore auto-scroll until this time

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    // Only loop where the carousel actually scrolls. Above 860px it is a grid,
    // and cloning there would silently double a static list.
    const wide = window.matchMedia('(min-width: 861px)')
    if (wide.matches) return

    /* ---- the clone that makes it endless ------------------------------- */
    const originals = [...el.children]
    const clones = originals.map((node) => {
      const c = node.cloneNode(true)
      c.setAttribute('aria-hidden', 'true')
      c.dataset.clone = 'true'
      c.removeAttribute('id')
      c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
      c.querySelectorAll('a, button, input, [tabindex]').forEach((n) => {
        n.setAttribute('tabindex', '-1')
      })
      return c
    })
    clones.forEach((c) => el.appendChild(c))
    setReady(true)

    const rtl = getComputedStyle(el).direction === 'rtl'
    const sign = rtl ? -1 : 1
    // Snap fights a continuous scroll — it tugs back on every frame.
    const snapWas = el.style.scrollSnapType
    el.style.scrollSnapType = 'none'

    /* ---- pause conditions ---------------------------------------------- */
    const hold = () => { held.current = true }
    const release = () => { held.current = false }
    const nudge = () => { untilRef.current = performance.now() + RESUME_AFTER }

    el.addEventListener('pointerenter', hold)
    el.addEventListener('pointerleave', release)
    el.addEventListener('pointerdown', hold)
    window.addEventListener('pointerup', release)
    el.addEventListener('focusin', hold)
    el.addEventListener('focusout', release)
    el.addEventListener('wheel', nudge, { passive: true })
    el.addEventListener('touchmove', nudge, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.15 })
    io.observe(el)

    /* ---- the loop ------------------------------------------------------- */
    let raf = 0
    let last = performance.now()
    let stopped = false

    /* scrollLeft is an integer in every engine, so `+= 0.36` each frame rounds
       straight back to zero and the carousel creeps at about 1px/s instead of
       22. The position is kept as a float here and written across each frame;
       `applied` is what we last wrote, so a difference from it means the
       reader scrolled and we resync rather than yanking them back. */
    let pos = el.scrollLeft
    let applied = pos

    const step = (now) => {
      const dt = Math.min(now - last, 50) / 1000    // clamp: tab wake-ups jump
      last = now

      if (Math.abs(el.scrollLeft - applied) > 1.5) pos = el.scrollLeft   // they moved it

      const running =
        !stopped && visible && !document.hidden && !held.current && now >= untilRef.current

      if (running) {
        pos += sign * SPEED * dt
        // Half the track is the clone, so rewinding by half lands on the
        // identical frame — the seam is invisible.
        const half = el.scrollWidth / 2
        if (rtl) {
          if (pos <= -half) pos += half
        } else if (pos >= half) {
          pos -= half
        }
        el.scrollLeft = pos
        applied = el.scrollLeft
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const onReduced = (e) => { if (e.matches) stopped = true }
    reduced.addEventListener('change', onReduced)

    // Exposed so the button can flip it without re-running this effect.
    el._setAuto = (on) => {
      stopped = !on
      if (on) { last = performance.now(); pos = el.scrollLeft; applied = pos }
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      reduced.removeEventListener('change', onReduced)
      el.removeEventListener('pointerenter', hold)
      el.removeEventListener('pointerleave', release)
      el.removeEventListener('pointerdown', hold)
      window.removeEventListener('pointerup', release)
      el.removeEventListener('focusin', hold)
      el.removeEventListener('focusout', release)
      el.removeEventListener('wheel', nudge)
      el.removeEventListener('touchmove', nudge)
      el.style.scrollSnapType = snapWas
      el.querySelectorAll('[data-clone="true"]').forEach((n) => n.remove())
      delete el._setAuto
    }
  }, [targetId])

  if (!ready) return null

  const toggle = () => {
    const el = document.getElementById(targetId)
    const next = !paused
    setPaused(next)
    el?._setAuto?.(!next)
  }

  return (
    <button type="button" className="carousel__toggle" onClick={toggle} aria-pressed={paused}>
      <span className="carousel__icon" aria-hidden="true">
        {paused ? (
          <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor"><path d="M1 1l9 5-9 5z" /></svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3.2" height="12" rx="1" /><rect x="6.8" y="0" width="3.2" height="12" rx="1" /></svg>
        )}
      </span>
      {paused ? playLabel : pauseLabel}
    </button>
  )
}
