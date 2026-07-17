/**
 * Business + contact details. Single source of truth — every page reads from
 * here, so changing a phone number is a one-line edit.
 *
 * All values below come from the client SRS §2. Nothing here is invented.
 */

export const site = {
  brand: '8Slabs',
  legalName: 'Simant Vijai',
  tagline: 'Indian Natural Stone, Sourced and Shipped',
  established: 2026,

  /* TODO(client): no domain is registered yet (SRS §9 = "N"). Point this at the
     real domain before launch — it is what builds absolute URLs for the
     OpenGraph tags that render WhatsApp / LinkedIn link previews. */
  url: 'https://8slabs.com',

  email: 'simantvijai@gmail.com',
  phone: '+91 85279 44844',
  phoneRaw: '918527944844',
  whatsapp: '918527944844',

  address: {
    line1: '4H44 Indira Gandhi Nagar, Jagatpura',
    line2: 'Jaipur, Rajasthan, India 302017',
    country: 'India',
  },

  description:
    'Sandstone, limestone, quartzite, slate, marble and granite sourced from North India’s stone belt and shipped to wholesalers, distributors, architects and turnkey projects worldwide. Quote-only pricing, one container minimum.',

  /* The client's own three differentiators, SRS §3, verbatim in substance. */
  values: [
    {
      title: 'Clear communication',
      body: 'You get a straight answer on availability, lead time and finish — and the same answer a week later. No chasing, no drift between what was quoted and what was loaded.',
    },
    {
      title: 'Fair pricing',
      body: 'Competitive rates from a decade of direct quarry and processor relationships, quoted plainly. Pricing is per requirement, so ask and you get a real number.',
    },
    {
      title: 'Quality driven',
      body: 'Material is inspected before it is packed, not after it lands. What was on the sample is what comes off the container.',
    },
  ],

  markets: ['Wholesalers', 'Distributors', 'Architects', 'Turnkey projects', 'Retailers'],

  /* A real, ordered sequence — this is the only place numbering is used on
     the site, because here the order genuinely carries information. */
  supplyChain: [
    { step: 'Source', body: 'Identify the right material and the right quarry for your specification and volume.' },
    { step: 'Inspect', body: 'Quality control at the processor, against the approved sample — before anything is packed.' },
    { step: 'Produce', body: 'Cutting, finishing and calibration tracked against your production window.' },
    { step: 'Pack', body: 'Seaworthy crating, edge protection and moisture control for long ocean freight.' },
    { step: 'Ship', body: 'Documentation and on-schedule despatch from port, with the container tracked to delivery.' },
  ],
}

export const whatsappLink = (msg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    msg || `Hello ${site.brand}, I'd like to enquire about your natural stone.`
  )}`

export const telLink = `tel:+${site.phoneRaw}`
export const mailLink = `mailto:${site.email}`
