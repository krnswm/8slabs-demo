import Catalogue from '../../../views/Catalogue.jsx'
import { buildMetadata } from '../../../i18n/metadata.js'

export const metadata = buildMetadata('en', '/catalogue/')

export default function Page() {
  return <Catalogue locale="en" />
}
