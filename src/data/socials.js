/**
 * Socials — the Instagram reel wall.
 *
 * ---------------------------------------------------------------------------
 * PLACEHOLDER CONTENT — READ BEFORE LAUNCH
 * ---------------------------------------------------------------------------
 * Client feedback: "Journal we can avoid… maybe we can use link to Instagram
 * on it" and "as we do not have a page right now lets use dummy data".
 *
 * So these are DUMMY reels, built to show the layout only. Every one is
 * labelled as a placeholder on screen and none of them links anywhere yet
 * (site.instagram.url is null until the real account exists).
 *
 * Deliberately NOT included: view counts, like counts, follower numbers or
 * dates. Those are factual claims about a real business's reach, and inventing
 * them — even as filler — would put fabricated numbers in front of a client
 * who may screenshot this. Captions describe the kind of content the reels
 * would hold; the numbers arrive with the real feed.
 *
 * TO GO LIVE: set site.instagram.url + handle, then either
 *   (a) replace `reels` below with real posts (thumbnail + permalink), or
 *   (b) wire an Instagram Basic Display / oEmbed feed and drop this file.
 */

export const reels = [
  {
    id: 'r1',
    caption: 'Kandla Grey being sawn and calibrated at the processor',
    tag: 'Factory floor',
    swatch: { base: '#9a968c', vein: '#6f6a60', flecks: '#c7c3b8', pattern: 'riven' },
  },
  {
    id: 'r2',
    caption: 'Teakwood sandstone — the grain running under water',
    tag: 'Material',
    swatch: { base: '#9c6f43', vein: '#6e4a29', flecks: '#d0a877', pattern: 'layered' },
  },
  {
    id: 'r3',
    caption: 'Loading day: crating and edge protection before the container seals',
    tag: 'Despatch',
    swatch: { base: '#8a745a', vein: '#5f4d3a', flecks: '#b39a7c', pattern: 'layered' },
  },
  {
    id: 'r4',
    caption: 'Quarry face in the Rajasthan belt',
    tag: 'Quarry',
    swatch: { base: '#c7ab73', vein: '#95744a', flecks: '#e7d4a6', pattern: 'riven' },
  },
  {
    id: 'r5',
    caption: 'Four finishes on one slab — natural, honed, flamed, brushed',
    tag: 'Material',
    swatch: { base: '#5f6f6a', vein: '#3f4c48', flecks: '#8fa09a', pattern: 'veined' },
  },
  {
    id: 'r6',
    caption: 'Black Galaxy under the light, before polish',
    tag: 'Material',
    swatch: { base: '#26251f', vein: '#161510', flecks: '#c9a86a', pattern: 'flecked' },
  },
  {
    id: 'r7',
    caption: 'Inspection against the approved sample',
    tag: 'Quality',
    swatch: { base: '#efe9df', vein: '#cdbfa8', flecks: '#ffffff', pattern: 'veined' },
  },
  {
    id: 'r8',
    caption: 'Multicolour slate stacked and banded for transit',
    tag: 'Despatch',
    swatch: { base: '#8a6a4a', vein: '#5c7350', flecks: '#c79a63', pattern: 'layered' },
  },
]
