import Catalogue from '../../../views/Catalogue.jsx'
import { buildMetadata } from '../../../i18n/metadata.js'
import { PREFIXED_LOCALES } from '../../../i18n/config.js'

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata(locale, '/catalogue/')
}

export default async function Page({ params }) {
  const { locale } = await params
  return <Catalogue locale={locale} />
}
