/**
 * Stone catalogue — representative selection of Indian natural stones.
 * These are real, well-known North-Indian stone varieties used as launch
 * placeholders. Confirm final SKU list, specifications and photography with
 * the client, then update entries below (or swap `swatch` for an `image`).
 *
 * Pricing is intentionally omitted — the client confirmed pricing is
 * quote-only and should not be shown publicly.
 */

export const categories = [
  'All',
  'Sandstone',
  'Limestone',
  'Quartzite',
  'Slate',
  'Marble',
  'Granite',
]

/**
 * The eight stones shown in the hero rack, in rack order.
 *
 * Chosen for tonal range across the row — grey, brown, green, blue-green,
 * silver, rust, white, black — so the rack reads as a full spread of the belt
 * rather than eight variations on beige. Eight is not arbitrary: it is the
 * brand name.
 */
export const RACK_IDS = [
  'kandla-grey',
  'teakwood',
  'raj-green',
  'kota-blue',
  'silver-shine',
  'multicolor-slate',
  'makrana-white',
  'black-galaxy',
]

export const stones = [
  // ---------------- Sandstone ----------------
  {
    id: 'kandla-grey',
    name: 'Kandla Grey',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Sawn', 'Honed', 'Sandblasted'],
    sizes: 'Slabs, tiles, cobbles · 15–40 mm',
    applications: ['Paving', 'Cladding', 'Landscaping'],
    blurb: 'A cool, riven grey sandstone with subtle earthy banding — a European paving favourite.',
    swatch: { base: '#9a968c', vein: '#6f6a60', flecks: '#c7c3b8', pattern: 'riven' },
  },
  {
    id: 'raj-green',
    name: 'Raj Green',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Sawn', 'Tumbled'],
    sizes: 'Calibrated slabs & tiles · 22–30 mm',
    applications: ['Garden paving', 'Walling', 'Patios'],
    blurb: 'Warm multi-tonal greens, browns and rust — highly weather-resistant and hard-wearing.',
    swatch: { base: '#7d8163', vein: '#565a3e', flecks: '#b9a878', pattern: 'riven' },
  },
  {
    id: 'teakwood',
    name: 'Teakwood Sandstone',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Honed', 'Brushed', 'Natural'],
    sizes: 'Slabs & tiles · 18–30 mm',
    applications: ['Feature walls', 'Flooring', 'Facades'],
    blurb: 'Rich brown grain resembling polished timber, with distinctive linear striations.',
    swatch: { base: '#9c6f43', vein: '#6e4a29', flecks: '#d0a877', pattern: 'layered' },
  },
  {
    id: 'modak',
    name: 'Modak',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Sawn', 'Sandblasted'],
    sizes: 'Slabs, tiles, cobbles',
    applications: ['Paving', 'Pool surrounds', 'Cladding'],
    blurb: 'Soft pink-beige tones with gentle veining — a warm, versatile all-rounder.',
    swatch: { base: '#c99c7d', vein: '#a06f4f', flecks: '#e7c9ad', pattern: 'veined' },
  },
  {
    id: 'rainbow',
    name: 'Rainbow Sandstone',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Honed'],
    sizes: 'Slabs & tiles · 20–30 mm',
    applications: ['Feature cladding', 'Facades', 'Interiors'],
    blurb: 'Dramatic multicolour banding of amber, violet and green across each slab.',
    swatch: { base: '#b08858', vein: '#7a5b7c', flecks: '#d8b98a', pattern: 'layered' },
  },
  {
    id: 'mint-fossil',
    name: 'Mint Fossil',
    category: 'Sandstone',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Sawn', 'Sandblasted'],
    sizes: 'Calibrated slabs & tiles',
    applications: ['Paving', 'Patios', 'Walling'],
    blurb: 'Pale mint-green base scattered with natural fossil markings — bright and contemporary.',
    swatch: { base: '#b6bda0', vein: '#8a9074', flecks: '#dfe1cb', pattern: 'flecked' },
  },

  // ---------------- Limestone ----------------
  {
    id: 'kota-blue',
    name: 'Kota Blue',
    category: 'Limestone',
    origin: 'Kota, Rajasthan, India',
    finishes: ['Natural', 'Honed', 'Polished', 'Leather'],
    sizes: 'Slabs & tiles · 18–40 mm',
    applications: ['Flooring', 'Paving', 'Wet areas'],
    blurb: 'Dense blue-green limestone, exceptionally hard-wearing and low-maintenance.',
    swatch: { base: '#5f6f6a', vein: '#3f4c48', flecks: '#8fa09a', pattern: 'veined' },
  },
  {
    id: 'kota-brown',
    name: 'Kota Brown',
    category: 'Limestone',
    origin: 'Kota, Rajasthan, India',
    finishes: ['Natural', 'Honed', 'Polished'],
    sizes: 'Slabs & tiles · 18–30 mm',
    applications: ['Flooring', 'Paving', 'Cladding'],
    blurb: 'Warm earthy-brown limestone with a soft matte surface and reliable durability.',
    swatch: { base: '#8a745a', vein: '#5f4d3a', flecks: '#b39a7c', pattern: 'veined' },
  },
  {
    id: 'lime-black',
    name: 'Lime Black',
    category: 'Limestone',
    origin: 'Andhra Pradesh, India',
    finishes: ['Honed', 'Polished', 'Brushed'],
    sizes: 'Slabs & tiles · 15–30 mm',
    applications: ['Interior flooring', 'Cladding', 'Countertops'],
    blurb: 'Deep charcoal-black limestone with a smooth, uniform, contemporary finish.',
    swatch: { base: '#33312e', vein: '#1e1d1b', flecks: '#565049', pattern: 'veined' },
  },

  // ---------------- Quartzite ----------------
  {
    id: 'silver-shine',
    name: 'Silver Shine Quartzite',
    category: 'Quartzite',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Cleft'],
    sizes: 'Random slabs & tiles',
    applications: ['Cladding', 'Paving', 'Facades'],
    blurb: 'Shimmering silver-grey quartzite with a naturally reflective, mica-rich surface.',
    swatch: { base: '#8f9296', vein: '#63666a', flecks: '#d5d8dc', pattern: 'riven' },
  },
  {
    id: 'golden-quartzite',
    name: 'Golden White Quartzite',
    category: 'Quartzite',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Cleft', 'Honed'],
    sizes: 'Random slabs & strip cladding',
    applications: ['Wall cladding', 'Facades', 'Landscaping'],
    blurb: 'Golden-cream quartzite streaked with rust and grey — striking on feature walls.',
    swatch: { base: '#c7ab73', vein: '#95744a', flecks: '#e7d4a6', pattern: 'riven' },
  },

  // ---------------- Slate ----------------
  {
    id: 'multicolor-slate',
    name: 'Multicolour Slate',
    category: 'Slate',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Cleft', 'Calibrated'],
    sizes: 'Tiles & cladding · 8–15 mm',
    applications: ['Wall cladding', 'Roofing', 'Flooring'],
    blurb: 'Warm autumnal blend of rust, gold and green with a natural riven cleft.',
    swatch: { base: '#8a6a4a', vein: '#5c7350', flecks: '#c79a63', pattern: 'layered' },
  },
  {
    id: 'black-slate',
    name: 'Black Slate',
    category: 'Slate',
    origin: 'Rajasthan, India',
    finishes: ['Natural', 'Honed', 'Calibrated'],
    sizes: 'Tiles & cladding · 10–15 mm',
    applications: ['Flooring', 'Cladding', 'Roofing'],
    blurb: 'Deep, even black slate with a subtle cleft texture — timeless and understated.',
    swatch: { base: '#3a3a3c', vein: '#232325', flecks: '#5a5a5d', pattern: 'layered' },
  },

  // ---------------- Marble ----------------
  {
    id: 'makrana-white',
    name: 'Makrana White Marble',
    category: 'Marble',
    origin: 'Makrana, Rajasthan, India',
    finishes: ['Polished', 'Honed'],
    sizes: 'Blocks, slabs & tiles',
    applications: ['Flooring', 'Sculpture', 'Interiors'],
    blurb: 'The legendary white marble of the Taj Mahal — pure, bright and enduring.',
    swatch: { base: '#efe9df', vein: '#cdbfa8', flecks: '#ffffff', pattern: 'veined' },
  },
  {
    id: 'rainforest-brown',
    name: 'Rainforest Brown Marble',
    category: 'Marble',
    origin: 'Rajasthan, India',
    finishes: ['Polished', 'Honed', 'Leather'],
    sizes: 'Slabs & tiles',
    applications: ['Feature walls', 'Countertops', 'Cladding'],
    blurb: 'Organic brown marble with dendritic veining resembling a dense forest canopy.',
    swatch: { base: '#7a5c3e', vein: '#463122', flecks: '#b28d5f', pattern: 'veined' },
  },

  // ---------------- Granite ----------------
  {
    id: 'black-galaxy',
    name: 'Black Galaxy Granite',
    category: 'Granite',
    origin: 'Andhra Pradesh, India',
    finishes: ['Polished', 'Honed', 'Flamed'],
    sizes: 'Slabs & tiles · 15–30 mm',
    applications: ['Countertops', 'Flooring', 'Cladding'],
    blurb: 'Jet-black granite flecked with golden-copper specks that catch the light.',
    swatch: { base: '#26251f', vein: '#161510', flecks: '#c9a86a', pattern: 'flecked' },
  },
  {
    id: 'kashmir-white',
    name: 'Kashmir White Granite',
    category: 'Granite',
    origin: 'Tamil Nadu, India',
    finishes: ['Polished', 'Honed'],
    sizes: 'Slabs & tiles · 15–30 mm',
    applications: ['Countertops', 'Flooring', 'Vanities'],
    blurb: 'Creamy-white granite with soft grey grains and warm burgundy flecks.',
    swatch: { base: '#ddd6c6', vein: '#a89a7f', flecks: '#9c5a4a', pattern: 'flecked' },
  },
  {
    id: 'tan-brown',
    name: 'Tan Brown Granite',
    category: 'Granite',
    origin: 'Southern India',
    finishes: ['Polished', 'Flamed'],
    sizes: 'Slabs & tiles · 15–30 mm',
    applications: ['Countertops', 'Cladding', 'Monuments'],
    blurb: 'Deep reddish-brown granite with black and grey speckling — dense and durable.',
    swatch: { base: '#5a3a34', vein: '#2f1e1b', flecks: '#8a736a', pattern: 'flecked' },
  },
]

/** Resolved rack stones, kept in RACK_IDS order (not catalogue order). */
export const rackStones = RACK_IDS.map((id) => {
  const stone = stones.find((s) => s.id === id)
  if (!stone) throw new Error(`RACK_IDS references unknown stone "${id}"`)
  return stone
})

export const getStone = (id) => stones.find((s) => s.id === id)
