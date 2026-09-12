'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LOCALES, DEFAULT_LOCALE, LOCALE_CODES, getLocale } from '../i18n/config.js'
import { PREF_KEY } from '../i18n/preference.js'

/**
 * Language switcher.
 *
 * Two things it deliberately does NOT do:
 *  · send you to the homepage. It maps the CURRENT path to its equivalent in
 *    the target language, so switching from /es/catalogue/ lands on
 *    /catalogue/ rather than dumping you back at the start.
 *  · use a <select>. Native selects cannot show each language in its own
 *    script reliably across platforms, and a buyer scanning for "العربية"
 *    needs to see it written that way, not as "Arabic".
 *
 * Plain links underneath, so it works without JavaScript and every locale is
 * crawlable from every page.
 */
export default function LanguageSwitcher({ locale = DEFAULT_LOCALE, label = 'Language' }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = getLocale(locale)

  // Close on outside click and on Escape — any dismissable surface needs both.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /**
   * Remember the pick, so the next visit opens in this language rather than
   * making the buyer find this menu again. Written before navigation, and
   * wrapped because Safari's private mode throws on setItem rather than
   * silently no-opping. If it throws, the choice still applies to this visit —
   * the URL carries it — it just is not remembered for the next one.
   */
  const remember = (code) => {
    try { localStorage.setItem(PREF_KEY, code) } catch (e) {}
    setOpen(false)
  }

  /** Strip any existing locale prefix, then apply the target one. */
  const swap = (target) => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length && LOCALE_CODES.includes(parts[0])) parts.shift()
    const rest = parts.length ? `/${parts.join('/')}/` : '/'
    return target === DEFAULT_LOCALE ? rest : `/${target}${rest}`
  }

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__btn"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${current.endonym}`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.6" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
        <span className="lang__code">{current.code.toUpperCase()}</span>
        {/* Phone-only. At the head of the mobile menu this row is the control
            a buyer who cannot read the nav reaches for first, so it names the
            language in full rather than as a two-letter code. */}
        <span className="lang__now" lang={current.code} dir={current.dir}>{current.endonym}</span>
        <svg className="lang__chev" width="12" height="12" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.2" aria-hidden="true" focusable="false">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul className="lang__menu" data-open={open}>
        {LOCALES.map((l) => (
          <li key={l.code}>
            <a
              href={swap(l.code)}
              lang={l.code}
              hrefLang={l.code}
              aria-current={l.code === locale ? 'true' : undefined}
              onClick={() => remember(l.code)}
            >
              {/* Endonym only — each language written as its own speakers write
                  it. You pick the language you can read, so an English gloss
                  beside it ("中文 CHINESE") is untranslated UI earning nothing.
                  `dir` sits on the text, not the row: on the <a> it flips the
                  flex children and the Arabic option renders backwards. */}
              <span className="lang__endonym" dir={l.dir}>{l.endonym}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
