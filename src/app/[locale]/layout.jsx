import SiteShell from '../../components/SiteShell.jsx'
import { FONT_CLASS } from '../../i18n/fonts.js'
import { buildMetadata } from '../../i18n/metadata.js'
import { PREFIXED_LOCALES } from '../../i18n/config.js'
import '../globals.css'
import '../components.css'

/** Only the non-default locales live here; English keeps the bare paths. */
export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata(locale, '/')
}

export const viewport = {
  themeColor: '#F7F5F2',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  return <SiteShell locale={locale} fontClass={FONT_CLASS}>{children}</SiteShell>
}
