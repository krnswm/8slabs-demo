/**
 * Business + contact details. Single source of truth — every page reads from
 * here, so changing a phone number is a one-line edit.
 *
 * Values come from the client SRS §2 and the client's written feedback.
 * Anything not yet supplied is marked with a TODO(client) and an
 * `isPlaceholder` flag — nothing here is silently invented.
 */

export const site = {
  brand: '8Slabz',
  legalName: 'Simant Vijai',
  /* From the client's own home-page copy. */
  tagline: 'Sourced with Experience, Delivered with Confidence',
  established: 2026,

  /* The registered domain. Builds the absolute URLs behind the OpenGraph tags
     that render WhatsApp / LinkedIn link previews, so it must match the live
     host exactly. */
  url: 'https://8slabz.com',

  /* TODO(client): PLACEHOLDER business email.
     Client feedback: "Email we will make of business and not use the personal
     one." The personal address (simantvijai@gmail.com) has been removed from
     the site accordingly. Replace the line below with the real business
     mailbox the moment it exists — it is not live yet, so mail sent here will
     bounce. */
  email: 'hello@8slabz.com',
  emailIsPlaceholder: true,

  phone: '+91 85279 44844',
  phoneRaw: '918527944844',
  whatsapp: '918527944844',

  /* Kept for records only — NOT rendered anywhere. Client feedback:
     "Lets just give watsapp and no address". Removing it from the data
     entirely would mean retyping it if they change their mind. */
  address: {
    line1: '4H44 Indira Gandhi Nagar, Jagatpura',
    line2: 'Jaipur, Rajasthan, India 302017',
    country: 'India',
  },


  /* The client's own words, from their home-page copy. */
  description:
    'Sandstone, limestone, quartzite, slate, marble and granite — sourced from India’s leading stone regions, carefully inspected and shipped with a decade of hands-on industry experience.',

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
