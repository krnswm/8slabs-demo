import Home from '../../views/Home.jsx'
import { buildMetadata } from '../../i18n/metadata.js'
import { PREFIXED_LOCALES } from '../../i18n/config.js'

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata(locale, '/')
}

export default async function Page({ params }) {
  const { locale } = await params
  return <Home locale={locale} />
}
