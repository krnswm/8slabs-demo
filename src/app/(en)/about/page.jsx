import About from '../../../views/About.jsx'
import { buildMetadata } from '../../../i18n/metadata.js'

export const metadata = buildMetadata('en', '/about/')

export default function Page() {
  return <About locale="en" />
}
