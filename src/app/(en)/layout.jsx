import SiteShell from '../../components/SiteShell.jsx'
import { FONT_CLASS } from '../../i18n/fonts.js'
import { buildMetadata } from '../../i18n/metadata.js'
import '../globals.css'
import '../components.css'

export const metadata = buildMetadata('en', '/')
export const viewport = {
  themeColor: '#F7F5F2',
  width: 'device-width',
  initialScale: 1,
}

export default function EnLayout({ children }) {
  return <SiteShell locale="en" fontClass={FONT_CLASS}>{children}</SiteShell>
}
