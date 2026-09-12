/**
 * English — the source of truth. Every other locale mirrors this shape exactly;
 * `npm run i18n:check` (scripts/check-i18n.mjs) fails the build if one drifts.
 *
 * NOT translated anywhere, by design:
 *   · stone proper names (Kandla Grey, Makrana White) — international trade
 *     names, ordered by these names in every market
 *   · place names and origins (Rajasthan, Andhra Pradesh)
 *   · the brand, phone number and email
 */
export default {
  meta: { reviewed: true, translator: 'source' },

  nav: {
    home: 'Home',
    about: 'About',
    catalogue: 'Catalogue',
    contact: 'Contact',
    enquire: 'Enquire',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    homeAria: 'home',
    primary: 'Primary',
    skip: 'Skip to main content',
  },

  common: {
    enquireWhatsapp: 'Enquire on WhatsApp',
    browseCatalogue: 'Browse the catalogue',
    viewCatalogue: 'View the full catalogue',
    scroll: 'Scroll',
    readStory: 'Read the full story',
    placeholder: 'Placeholder',
    placeholderTexture: 'Placeholder texture',
    notPhotograph: 'Placeholder — not a photograph',
    material: 'Material',
    applications: 'Applications',
    finishes: 'Finishes',
    enquireAbout: 'Enquire about {material}',
    whatsappGreeting: 'Hello 8Slabz, I would like to enquire about your natural stone.',
    whatsappMaterial: 'Hello 8Slabz, I would like to enquire about {material}. Quantity and destination port to follow.',
  },

  home: {
    title: '8Slabz — Sourced with Experience, Delivered with Confidence',
    crumbLeft: 'Natural stone export',
    crumbRight: 'Jaipur, India',
    headline: 'India’s Natural Stone. Sourced with Experience. Delivered with Confidence.',
    sub: 'Sandstone, limestone, quartzite, slate, marble and granite — sourced from India’s leading stone regions, carefully inspected and shipped with a decade of hands-on industry experience.',
    materialsNav: 'Stone materials',

    introEyebrow: 'Who we are',
    introTitle: 'You specify the stone. We take care of the rest.',
    introP1: 'We connect international buyers with reliable quarries, processors and stone manufacturers across India, helping you source the right material, achieve consistent quality and keep every shipment on schedule.',
    introP2: 'You specify the stone. We take care of the sourcing, quality and delivery.',

    valuesEyebrow: 'Why 8Slabz',
    valuesTitle: 'Three commitments, and what they cost us to keep.',

    collectionEyebrow: 'The collection',
    collectionTitle: 'Read the face before you commit a container.',
    collectionBody: 'Every stone carries its origin, finishes, thicknesses and applications. Pricing is per requirement — send the material, quantity and destination port and you get a real number back.',

    marketsEyebrow: 'Who we work with',
    marketsTitle: 'Built for professional buyers.',
    marketsBody: '8Slabz is business-to-business only. The minimum is one container load, and the people on the other end of the call already know what they are specifying.',

    ctaTitle: 'Tell us what you need to land.',
    ctaBody: 'Material, quantity and destination port is enough to start. You get availability, finishes and a plan for the container — usually the same day.',
    ctaAlt: 'Other ways to reach us',
  },

  about: {
    title: 'About',
    metaDescription: 'A decade in Indian natural stone export — sourcing, quality assurance and the quarry and processor relationships behind every container 8Slabz ships.',
    crumb: '8Slabz — About',
    metaLine: 'Est. {year} · Jaipur',
    eyebrow: 'About',
    heroTitle: 'A decade of the stone belt, in one pair of hands.',
    heroLead: '8Slabz was founded in 2026. The experience behind it is considerably older.',
    factFounded: 'Founded',
    factBase: 'Base',
    factBaseValue: 'Jaipur, India',
    factModel: 'Model',
    factModelValue: 'B2B export',

    slabPhotoAlt: 'A finished slab in the yard, tagged with its dimensions before shipping.',

    storyEyebrow: 'The short version',
    storyTitle: 'Ten Years Learning What Goes Wrong',
    storyP1: 'I spent the last decade with one of India’s leading natural stone export companies, working across international business, customer relationships, and quality assurance. That is where you learn what actually goes wrong with a container—and it is rarely the stone itself.',
    storyP2: 'It is a batch that drifts from the approved sample. A finish agreed on a call but never written down. A production schedule that quietly slips by three weeks before anyone says so. Every one of these is a communication failure wearing a technical costume.',
    storyP3: '8Slabz exists to close that gap.',
    storyP4: 'My knowledge spans North India’s stone belt—sandstone, limestone, quartzite, slate, and the regional materials around them—as well as the full supply chain: identifying the right material, sourcing from processors I have worked with for years, maintaining quality, and getting it onto the ship on the date I committed to.',
    storyP5: 'I believe long-term business is built on trust, transparency, and keeping commitments. These are not slogans on a wall here; they are the foundation of how I work.',
    storyP6: 'As a one-person operation, I do not have a large team or layers of management to hide behind. What I have is experience, relationships, accountability, and a commitment to do what I say I will do.',
    storyP7: 'That is what 8Slabz is built on.',

    chainEyebrow: 'Quarry to delivery',
    chainTitle: 'Where a container is won or lost.',
    chainBody: 'Five stages. The third one is where most problems are caught, and the second is where most problems are created.',

    valuesEyebrow: 'How we work',
    valuesTitle: 'Three commitments.',

    teamEyebrow: 'Leadership',
    teamTitle: 'Who you will actually be talking to.',
    founderRole: 'Founder',
    founderBio: 'Ten years in Indian natural stone export, across international business, customer relationships and quality assurance. Handles sourcing, inspection and every enquiry personally.',

    ctaTitle: 'Start with a material and a port.',
    ctaBody: 'That is genuinely enough for a useful first answer.',
    ctaAlt: 'See the catalogue',
  },

  catalogue: {
    title: 'Stone catalogue',
    metaDescription: 'Granite, marble, sandstone, quartzite, limestone and slate from India — what each material is, where it performs, and the finishes it takes. Quote-only pricing, one container minimum.',
    crumb: '8Slabz — Catalogue',
    metaLine: 'Quote-only pricing',
    eyebrow: 'Catalogue',
    heroTitle: 'Know the material before you specify it.',
    heroLead: 'What each stone family is, where it performs, and the finishes it takes — with a representative selection from each. Pricing is quoted per requirement.',
    factPricing: 'Pricing',
    factPricingValue: 'Quote-only',
    factMinimum: 'Minimum',
    factMinimumValue: '1 container',
    factScope: 'Scope',
    factScopeValue: 'B2B export',
  },

  contact: {
    title: 'Contact',
    metaDescription: 'Reach 8Slabz on WhatsApp, phone or email. Send the material, quantity and destination port and get availability, finishes and a plan for your container.',
    crumb: '8Slabz — Contact',
    metaLine: 'B2B enquiries',
    eyebrow: 'Contact',
    heroTitle: 'Message us. You will get a person.',
    heroLead: 'Send the material, the quantity and the destination port. That is enough for a real answer on availability, finishes and lead time.',
    factFastest: 'Fastest',
    factFastestValue: 'WhatsApp',
    factReply: 'Reply',
    factReplyValue: 'Same day',
    factScope: 'Scope',
    factScopeValue: 'B2B only',

    linesTitle: 'Direct lines',
    linesBody: 'WhatsApp is the fastest — it is where the business actually runs.',
    labelWhatsapp: 'WhatsApp — fastest',
    labelPhone: 'Phone',
    labelEmail: 'Email',
    openWhatsapp: 'Open WhatsApp',

    includeTitle: 'What to include',
    includeBody: 'You will get a faster, more useful answer if the first message covers:',
    includeMaterial: 'Material',
    includeMaterialBody: 'Which stone, and the finish if you know it.',
    includeQuantity: 'Quantity',
    includeQuantityBody: 'Volume or container count. The minimum is one container load.',
    includeDestination: 'Destination',
    includeDestinationBody: 'Port of discharge — it drives freight and lead time.',
    includeTimeline: 'Timeline',
    includeTimelineBody: 'When it needs to land, not when it needs to ship.',
    footNote: 'Business-to-business only · Pricing quoted per requirement',
  },

  footer: {
    blurb: 'Natural stone from North India’s stone belt, sourced and shipped for professional buyers worldwide.',
    pages: 'Pages',
    materials: 'Materials',
    getInTouch: 'Get in touch',
    whatsapp: 'WhatsApp {phone}',
    call: 'Call {phone}',
    rights: 'Indian natural stone · Exported worldwide',
    slateMarble: 'Slate & marble',
  },

  notFound: {
    title: 'Page not found',
    heading: 'That page isn’t here.',
    body: 'The link may be out of date. The catalogue is the best place to pick the thread back up.',
    catalogue: 'Browse the catalogue',
    home: 'Back to home',
  },

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

  supplyChain: [
    { step: 'Source', body: 'Identify the right material and the right quarry for your specification and volume.' },
    { step: 'Inspect', body: 'Quality control at the processor, against the approved sample — before anything is packed.' },
    { step: 'Produce', body: 'Cutting, finishing and calibration tracked against your production window.' },
    { step: 'Pack', body: 'Seaworthy crating, edge protection and moisture control for long ocean freight.' },
    { step: 'Ship', body: 'Documentation and on-schedule despatch from port, with the container tracked to delivery.' },
  ],

  markets: ['Wholesalers', 'Distributors', 'Architects', 'Turnkey projects', 'Retailers'],

  families: {
    Granite: {
      name: 'Granite',
      blurb: 'Strong, durable and versatile, Indian granite is available in a wide range of colours, patterns and finishes. Its excellent resistance to wear and weather makes it suitable for both interior and exterior applications.',
      applications: 'Flooring, cladding, countertops, stairs, paving and landscaping.',
      finishes: 'Polished, honed, leathered, flamed and brushed, depending on the stone.',
    },
    Marble: {
      name: 'Marble',
      blurb: 'Prized for its depth and veining, Indian marble runs from the bright whites of Makrana to richly figured browns and greens. It is a softer stone that rewards interior use, where the surface and pattern are seen close up.',
      applications: 'Flooring, feature walls, countertops, vanities, sculpture and interior cladding.',
      finishes: 'Polished, honed and leathered, depending on the stone.',
    },
    Sandstone: {
      name: 'Sandstone',
      blurb: 'India’s most widely exported natural stone. Warm, earthy tones and a naturally riven face with good slip resistance, it weathers well outdoors and has long been a standard for landscaping across Europe.',
      applications: 'Paving, patios, garden landscaping, walling, cladding and facades.',
      finishes: 'Natural, sawn, honed, sandblasted, tumbled and brushed.',
    },
    Quartzite: {
      name: 'Quartzite',
      blurb: 'One of the hardest natural stones. Quartzite splits to a naturally cleft face with a mica-rich shimmer, and its strength and texture suit feature cladding and facades that have to last.',
      applications: 'Wall cladding, facades, paving and landscaping.',
      finishes: 'Natural, cleft and honed.',
    },
    Limestone: {
      name: 'Limestone',
      blurb: 'Dense and fine-grained, Indian limestone gives a calm, uniform surface in blues, browns and blacks. Hard-wearing and low-maintenance, it performs equally well underfoot indoors and around wet areas.',
      applications: 'Flooring, paving, wet areas, cladding and countertops.',
      finishes: 'Natural, honed, polished and leathered.',
    },
    Slate: {
      name: 'Slate',
      blurb: 'A fine-grained stone that cleaves into thin, even layers, from deep uniform blacks to warm autumnal multicolours. Naturally low-porosity and hard-wearing.',
      applications: 'Wall cladding, roofing, flooring and paving.',
      finishes: 'Natural, cleft, calibrated and honed.',
    },
  },
}
