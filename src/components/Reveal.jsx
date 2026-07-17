'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Releases its children when they scroll into view.
 *
 * IntersectionObserver rather than a scroll listener: no work happens on the
 * main thread between intersections, so scrolling stays at 60fps on the
 * low-end phones a lot of export buyers browse on. Each element is unobserved
 * once shown — reveals never re-run.
 *
 * The hidden state lives in CSS (.reveal), and layout.jsx ships a <noscript>
 * override, so content is still readable if JS never arrives.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      // Fire slightly before the element is fully in view so the reveal has
      // finished by the time the reader's eye reaches it.
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-shown={shown}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
