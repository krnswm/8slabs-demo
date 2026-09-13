'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Drives an existing `.carousel` scroller: slow continuous auto-scroll that
 * runs forever, and gets out of the way the instant anyone touches it.
 *
 * It attaches to an element already in the page rather than wrapping one,
 * because `.fam__grid` carries the alternating `order` that flips the
 * catalogue layout every other family. Wrapping it would move that ordering
 * onto the wrapper and break the rhythm down the page.
 *
 * NOTHING IS DUPLICATED. The usual way to loop a carousel endlessly is to
 * clone the items and rewind by exactly one set, which makes the seam
 * invisible — but every stone then exists twice in the DOM, and anything that
 * is not the phone carousel shows the catalogue saying "Kandla Grey" twice.
 * On a catalogue of real materials that reads as a mistake, and the confusion
 * costs more than the seamlessness is worth.
 *
 * So it travels instead: out to the end, back to the start, out again. The
 * motion is continuous, it never jumps, and every stone appears exactly once
 * in every view.
 *
 * Auto-motion is a real accessibility hazard, so it stops for all of:
 *   · prefers-reduced-motion — never starts at all
 *   · pointer over it, or focus inside it
 *   · any deliberate scroll — permanently, for the rest of the visit
 *   · the carousel being off-screen, or the tab being in the background
 *   · the Pause control, which WCAG 2.2.2 requires for anything that moves by
 *     itself beyond five seconds. It sits off-screen until it takes keyboard
 *     focus, so the control exists without being on display.
 */

/** Pixels per second. Slow on purpose: this is a material you look at. */
const SPEED = 22
/** Above this the carousel is a grid and autoplay is meaningless. */
const CAROUSEL_MAX_WIDTH = 860

export default function CarouselAutoplay({ targetId, pauseLabel, playLabel }) {
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const held = useRef(false)

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = window.matchMedia(`(max-width: ${CAROUSEL_MAX_WIDTH}px)`)
    if (reduced.matches) return

    setReady(true)

    const snapWas = el.style.scrollSnapType
    let stopped = false               // permanent: the reader took over
    let heading = 1                   // +1 outbound, -1 back

    const hold = () => { held.current = true }
    const release = () => { held.current = false }

    /* A deliberate scroll ends it for the visit. With the Pause control off
       screen this is the mechanism WCAG 2.2.2 asks for: anyone bothered by the
       motion stops it by doing the obvious thing, and it stays stopped. Snap
       returns at the same moment, so their own swipes settle on a card. */
    const surrender = () => {
      stopped = true
      el.style.scrollSnapType = snapWas
    }

    el.addEventListener('pointerenter', hold)
    el.addEventListener('pointerleave', release)
    el.addEventListener('pointerdown', hold)
    window.addEventListener('pointerup', release)
    el.addEventListener('focusin', hold)
    el.addEventListener('focusout', release)
    el.addEventListener('wheel', surrender, { passive: true })
    el.addEventListener('touchmove', surrender, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.15 })
    io.observe(el)

    /* scrollLeft is an integer in every engine, so `+= 0.36` per frame rounds
       straight back to zero and the carousel creeps at about 1px/s instead of
       22. Position is kept as a float and written across each frame; `applied`
       is what we last wrote, so a difference means the reader moved it. */
    let pos = el.scrollLeft
    let applied = pos
    let raf = 0
    let last = performance.now()

    const step = (now) => {
      const dt = Math.min(now - last, 50) / 1000
      last = now

      const active = narrow.matches && !stopped
      if (active) el.style.scrollSnapType = 'none'

      if (Math.abs(el.scrollLeft - applied) > 1.5) pos = el.scrollLeft

      if (active && visible && !document.hidden && !held.current) {
        // In RTL scrollLeft runs from 0 down to -span, so the limits mirror
        // rather than the logic being written twice.
        const span = el.scrollWidth - el.clientWidth
        const rtl = getComputedStyle(el).direction === 'rtl'
        const lo = rtl ? -span : 0
        const hi = rtl ? 0 : span

        pos += heading * (rtl ? -1 : 1) * SPEED * dt

        if (pos >= hi) { pos = hi; heading = rtl ? 1 : -1 }
        else if (pos <= lo) { pos = lo; heading = rtl ? -1 : 1 }

        el.scrollLeft = pos
        applied = el.scrollLeft
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const onReduced = (e) => {
      if (e.matches) { stopped = true; el.style.scrollSnapType = snapWas }
    }
    reduced.addEventListener('change', onReduced)

    /* Crossing into grid layout restores snap and parks the scroller at the
       start — a grid inheriting a scrollLeft from the carousel it used to be
       would sit mysteriously offset. The frame loop reads `narrow.matches`
       live, so the travel stops on its own. */
    const onWidth = (e) => {
      if (!e.matches) {
        el.style.scrollSnapType = snapWas
        el.scrollLeft = 0
        pos = 0
        applied = 0
        heading = 1
      }
    }
    narrow.addEventListener('change', onWidth)

    el._setAuto = (on) => {
      stopped = !on
      if (on) { last = performance.now(); pos = el.scrollLeft; applied = pos }
      else el.style.scrollSnapType = snapWas
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      reduced.removeEventListener('change', onReduced)
      narrow.removeEventListener('change', onWidth)
      el.removeEventListener('pointerenter', hold)
      el.removeEventListener('pointerleave', release)
      el.removeEventListener('pointerdown', hold)
      window.removeEventListener('pointerup', release)
      el.removeEventListener('focusin', hold)
      el.removeEventListener('focusout', release)
      el.removeEventListener('wheel', surrender)
      el.removeEventListener('touchmove', surrender)
      el.style.scrollSnapType = snapWas
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
