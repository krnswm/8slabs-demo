'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { whatsappLink } from '../data/site.js'
import BrandMark from './BrandMark.jsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/catalogue/', label: 'Catalogue' },
  { href: '/journal/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close the menu on navigation — a menu that survives a route change leaves
  // the user staring at links over the page they just asked for.
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    // passive: this listener never calls preventDefault, so the browser is
    // free to keep scrolling at full speed while it runs.
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu — every dismissable surface needs a keyboard exit.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isCurrent = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="nav" data-scrolled={scrolled} aria-label="Primary">
      <div className="container nav__inner">
        <Link href="/" className="brand" aria-label="8Slabs — home">
          <BrandMark className="brand__mark" />
          <span className="brand__word">8Slabs</span>
        </Link>

        <button
          className="nav__burger"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div className="nav__links" id="nav-links" data-open={open}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav__link"
              aria-current={isCurrent(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a
            className="btn btn--primary nav__cta"
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer noopener"
          >
            Enquire
          </a>
        </div>
      </div>
    </nav>
  )
}
