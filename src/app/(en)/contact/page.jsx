import Contact from '../../../views/Contact.jsx'
import { buildMetadata } from '../../../i18n/metadata.js'

export const metadata = buildMetadata('en', '/contact/')

export default function Page() {
  return <Contact locale="en" />
}
