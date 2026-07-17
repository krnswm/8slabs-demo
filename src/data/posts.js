/**
 * Journal — news, exhibitions and material guides. SRS §6 confirmed this
 * section as required (Y).
 *
 * ---------------------------------------------------------------------------
 * PLACEHOLDER CONTENT — READ BEFORE LAUNCH
 * ---------------------------------------------------------------------------
 * These are editorial drafts written from the client's own stated expertise
 * (SRS §3). They are safe to show a client for layout review, but Simant must
 * approve or replace the copy before this goes live under his name.
 *
 * What is deliberately NOT here: any claim that 8Slabs attended, exhibited at,
 * or will exhibit at a named trade fair. An earlier draft asserted attendance
 * at STONA and the Xiamen Stone Fair — real events — and dated posts to
 * Oct–Dec 2025, before the company existed (established 2026). Those are
 * factual claims about a real business and cannot be invented. Exhibition
 * entries must come from the client; until they do, the Journal shows an
 * honest empty state for that category.
 */

export const postKinds = ['All', 'Material Guide', 'Behind the Scenes', 'Exhibition']

export const posts = [
  {
    id: 'choosing-a-finish',
    kind: 'Material Guide',
    title: 'Natural, honed, flamed or leathered — choosing a finish that survives the application',
    date: '2026-06-18',
    dateLabel: 'June 2026',
    readMins: 6,
    excerpt:
      'A flamed finish on an interior floor is a maintenance complaint waiting to happen; a honed one on a wet pool surround is a slip hazard. What each finish actually does, and where it belongs.',
    swatch: { base: '#5f6f6a', vein: '#3f4c48', flecks: '#8fa09a', pattern: 'veined' },
  },
  {
    id: 'kandla-grey-europe',
    kind: 'Material Guide',
    title: 'Why Kandla Grey keeps getting specified for European landscaping',
    date: '2026-05-02',
    dateLabel: 'May 2026',
    readMins: 5,
    excerpt:
      'Frost resistance, a consistent riven face and a price that survives a landscaping budget. A look at what makes this sandstone the default on UK and EU paving schedules — and where it disappoints.',
    swatch: { base: '#9a968c', vein: '#6f6a60', flecks: '#c7c3b8', pattern: 'riven' },
  },
  {
    id: 'quarry-to-port',
    kind: 'Behind the Scenes',
    title: 'Quarry to port: the checkpoints that keep a container on schedule',
    date: '2026-04-09',
    dateLabel: 'April 2026',
    readMins: 7,
    excerpt:
      'Sourcing, inspection against the approved sample, cutting, packing, documentation. Where container timelines actually slip, and the checks that catch it before your site does.',
    swatch: { base: '#8a745a', vein: '#5f4d3a', flecks: '#b39a7c', pattern: 'layered' },
  },
  {
    id: 'batch-variation',
    kind: 'Material Guide',
    title: 'Natural variation vs. the wrong material: how to read a stone sample',
    date: '2026-03-12',
    dateLabel: 'March 2026',
    readMins: 6,
    excerpt:
      'Every quarry batch shifts in tone — that is the material behaving normally. Knowing where legitimate variation ends and a substituted batch begins is the difference between a signed-off delivery and a rejected one.',
    swatch: { base: '#b08858', vein: '#7a5b7c', flecks: '#d8b98a', pattern: 'layered' },
  },
  {
    id: 'packing-standards',
    kind: 'Behind the Scenes',
    title: 'Export packing that actually protects stone across an ocean',
    date: '2026-02-20',
    dateLabel: 'February 2026',
    readMins: 5,
    excerpt:
      'Seaworthy crating, edge protection and moisture control. Breakage in transit is almost always a packing decision made weeks earlier, not bad luck at sea.',
    swatch: { base: '#3a3a3c', vein: '#232325', flecks: '#5a5a5d', pattern: 'layered' },
  },
]
