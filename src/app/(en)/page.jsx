import Home from '../../views/Home.jsx'
import { buildMetadata } from '../../i18n/metadata.js'

export const metadata = buildMetadata('en', '/')

export default function Page() {
  return <Home locale="en" />
}
