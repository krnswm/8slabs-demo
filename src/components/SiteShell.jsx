import { getDictionary } from '../i18n/dictionaries.js'
import { getLocale, DEFAULT_LOCALE } from '../i18n/config.js'
import { preferenceScript } from '../i18n/preference.js'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

/**
 * The document shell, shared by both root layouts (English at /, and the
 * prefixed locales under /[locale]/).
 *
 * There are two root layouts rather than one because only a root layout may
 * render <html>, and `lang` / `dir` have to be correct in the SERVED markup —
 * setting them from the client would leave every crawler and screen reader
 * seeing English on the Arabic page. Route groups let both layouts share this
 * one component, so the markup still lives in a single place.
 */
export default function SiteShell({ locale = DEFAULT_LOCALE, fontClass = '', children }) {
  const t = getDictionary(locale)
  const { dir } = getLocale(locale)

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <head>
        {/* Routes a visitor to their own language before first paint. Inline
            and synchronous on purpose: see src/i18n/preference.js. */}
        <script dangerouslySetInnerHTML={{ __html: preferenceScript() }} />
        {/* Scroll reveals hide their content in CSS and are released by JS.
            If JS never runs, nothing would ever be readable — so force every
            revealed element visible when scripting is off. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip">{t.nav.skip}</a>
        <Nav locale={locale} t={t} />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer locale={locale} t={t} />
        <WhatsAppFloat label={t.common.enquireWhatsapp} />
      </body>
    </html>
  )
}
