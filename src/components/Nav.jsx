'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site, whatsappLink } from '../data/site.js'
import { localePath, DEFAULT_LOCALE } from '../i18n/config.js'
import BrandMark from './BrandMark.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Nav({ locale = DEFAULT_LOCALE, t }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)

  const p = (path) => localePath(path, locale)
  const home = p('/')
  const links = [
    { href: home, label: t.nav.home },
    { href: p('/about/'), label: t.nav.about },
    { href: p('/catalogue/'), label: t.nav.catalogue },
    { href: p('/contact/'), label: t.nav.contact },
  ]

  // Close the menu on navigation — a menu that survives a route change leaves
  // the user staring at links over the page they just asked for.
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > 8)

      /* Is the pill currently floating over a dark section? A light pill over
         dark content can only look like a grey bar — nothing behind it to see
         through, and dark-on-grey is washed out. Over dark content the nav
         flips to dark glass with light type. Measured live rather than
         hard-coded per route, so it stays correct at any hero height. */
      const dark = document.querySelector('.hero--dark')
      const navBottom =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 76
      setOnDark(!!dark && dark.getBoundingClientRect().bottom > navBottom)
    }

    // rAF-throttled: this handler reads layout, and doing that on every raw
    // scroll event is what causes jank.
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Escape closes the menu — every dismissable surface needs a keyboard exit.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isCurrent = (href) =>
    href === home
      ? pathname === home || pathname === home.replace(/\/$/, '')
      : pathname.startsWith(href)

  return (
    <nav
      className="nav"
      data-scrolled={scrolled}
      data-theme={onDark ? 'dark' : 'light'}
      aria-label={t.nav.primary}
    >
      <div className="container nav__inner">
        {/* Refraction layer. This is what separates real liquid glass from a
            blurred bar: the SVG filter below displaces the pixels BEHIND the
            pill, so the page bends through it like an actual lens.

            It lives on its own element because `backdrop-filter: blur() url(#id)`
            is invalid as a whole in engines without url() filter support, which
            would take the blur down with it. As a separate layer it simply does
            nothing there, and the blurred pill underneath is still correct. */}
        <span className="nav__refract" aria-hidden="true" />

        <Link href={home} className="brand" aria-label={`${site.brand} — ${t.nav.homeAria}`}>
          <BrandMark className="brand__mark" />
          <span className="brand__word">{site.brand}</span>
        </Link>

        <button
          className="nav__burger"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
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

          <LanguageSwitcher locale={locale} label={t.nav.language} />

          <a
            className="btn btn--primary nav__cta"
            href={whatsappLink(t.common.whatsappGreeting)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.nav.enquire}
          </a>
        </div>
      </div>

      <GlassFilter />
    </nav>
  )
}

/**
 * The lens. feTurbulence generates smooth fractal noise, which feDisplacementMap
 * uses to push the backdrop's pixels around — that displacement is the
 * refraction you see at the rim of thick glass.
 *
 * Tuned well below the values usually quoted for this trick: a displacement
 * scale of ~70 smears a navbar into illegibility, and a high baseFrequency
 * reads as noise rather than glass. The CSS masks it to the rim so the middle
 * of the pill — where the links are — stays optically clean.
 */
function GlassFilter() {
  return (
    <svg className="nav__filter" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="nav-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.006"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  )
}
