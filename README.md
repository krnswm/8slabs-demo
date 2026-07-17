# 8Slabs — Website

Marketing website for **8Slabs** (Simant Vijai) — exporter of Indian natural
stone, Jaipur. Built with **Next.js 15 (App Router)**, exported as a fully
static site.

Built against the client SRS v1. Section references below (e.g. "SRS §7.1")
point back at that document.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → /out
npm run preview    # serve /out locally
```

`npm run build` produces plain static files in `/out`. Deploy that folder to
Netlify, Vercel, Cloudflare Pages, or any cPanel/Apache host. No server, no
Node runtime, no database.

### If the dev server feels slow (2–3s to change pages)

That slowness is the **dev server**, not the site. `next dev` compiles each
route the first time you visit it — the first click to `/about` builds `/about`
on the spot, which is the 2–3s pause. It is a one-time, dev-only cost.

Two things make it worse here, both fixable:

- **The project is inside a OneDrive-synced folder.** OneDrive continuously
  syncs `.next` (a 100MB+ cache Next rewrites on every keystroke). That fights
  the dev server for file locks and slows every rebuild. Fix: right-click
  `.next` and `node_modules` → *Always keep off this device* (Free up space),
  or move the project out of OneDrive (e.g. `C:\dev\8slabs`).
- **Stale dev servers.** Several `node` processes had been left running; kill
  stray `node.exe` in Task Manager before starting a fresh `npm run dev`.

**The real product has none of this.** In the production build the whole site
is static HTML and the nav links are prefetched, so page changes are
effectively instant. To feel the true speed: `npm run build && npm run preview`
and click around `http://localhost:3000`.

---

## Design decisions worth knowing

**Colour is the client's, exactly.** Every hex in SRS §10 is used verbatim in
`src/app/globals.css`. Do not "improve" them. Anything not in the SRS is
derived from those values with `color-mix()` so the palette cannot drift.

**The accent is split by job, for contrast.** `#A67C52` on `#F7F5F2` measures
3.43:1 — fine for fills, borders and large display type, but under the 4.5:1
WCAG AA floor for normal text. So:

| Token | Value | Use |
|---|---|---|
| `--c-accent` | `#A67C52` | fills, borders, rules, large display (SRS, untouched) |
| `--c-accent-ink` | `#836241` | accent **text** under ~24px; accent fills with light labels |
| `--c-accent-dark` | `#A87F55` | accent text on the near-black footer |

Never put `--c-accent` on small text. Every pairing was measured against the
*darkest* surface it appears on, not the flattering one.

**The signature is the rack.** `src/components/SlabRack.jsx` — eight slabs
standing on edge, which is how slabs are actually stored in a yard. Hovering
pulls one forward, the way a buyer pulls a slab to read its face. It's a server
component: the entrance stagger and pull-forward are pure CSS, so the most
expressive thing on the site costs **zero JavaScript** and works before
hydration.

**Type — a real pairing, three faces.** Archivo (variable width, display set
expanded — slab proportions) for headings, set large and *light* rather than
bold because large-and-light reads as considered where bold-and-tight reads as
loud. **Newsreader** (variable optical-size) as a serif body — a serif under a
grotesk display inverts the cream-and-serif-headline look every AI site lands
on. IBM Plex Mono for anything technical: origins, thicknesses, finishes,
dates, and all button labels. All three self-hosted via `next/font`.

**Imagery — fractal, not stripes.** `StoneSwatch` builds each face from SVG
`feTurbulence` fractal noise with an *anisotropic* frequency per material
(sandstone banded, marble flowing, granite isotropic speckle), mapped through
each stone's real palette. Stone is fractal; repeating-gradient stripes read as
"CSS pretending to be rock." Still a labelled placeholder — better-looking, same
honesty.

**Backgrounds.** No alternating cream/greige bands (the cheapest possible
"new section" signal). Sections are divided by a hairline rule; there is exactly
one tonal break — a single near-black band on the homepage catalogue, where
stone finally reads as material rather than swatch. Every surface carries ~4%
fractal grain (`--grain`), because nothing physical is perfectly flat.

**Section rhythm.** Three scales (`--section-sm/-/-lg`), not one. The catalogue
band gets `--lg`; supporting sections get `--sm`. Equal-height bands have no
hierarchy no matter how good their contents.

**Motion — one gesture.** No GSAP (its SplitText/Flip are paid). The whole site
shares one move: everything is *set into place like a slab* — lowered onto its
bottom edge with a slight weight-settle overshoot (`--ease-set`), the same
motion the rack makes. The h1 gets a single saw-cut clip reveal, once per visit.
The rack has scroll-linked parallax depth via `animation-timeline: view()`,
guarded by `@supports` so unsupported browsers get a still rack. Cards lean in
over 1.2s (material, not feedback); buttons fill by a left-edge wipe, not a
cross-fade. All `transform`/`opacity`, so nothing causes layout/CLS.
`prefers-reduced-motion` neutralises every one of these globally.

**Numbering.** The only numbered list on the site is the supply chain on
`/about` — because there the order genuinely carries information. The three
values are a set, not a sequence, so they are not numbered.

---

## Where to edit content

| What | File |
|---|---|
| Business name, contact, address, values, supply chain | `src/data/site.js` |
| Stone catalogue (18 varieties, specs) | `src/data/stones.js` |
| Which 8 stones appear in the hero rack | `RACK_IDS` in `src/data/stones.js` |
| Journal entries | `src/data/posts.js` |
| Colour, type, spacing, motion tokens | `src/app/globals.css` (`:root`) |

Contact details come from SRS §2 and live in one place — change them once and
they propagate site-wide.

---

## Before launch — required

1. **Set the domain.** `site.url` in `src/data/site.js` is `https://8slabs.com`,
   a placeholder (SRS §9: no domain registered). This builds the absolute URLs
   for the OpenGraph tags — link previews break until it is real.

2. **Real slab photography.** Every stone face is a *generated CSS texture*
   (`StoneSwatch`), labelled "Placeholder — not a photograph" on screen. This
   labelling is deliberate and must stay until real photos land: in natural
   stone, appearance varies by quarry batch and buyers commit to containers
   against what they see. Shipping a generated texture unlabelled — or a stock
   photo of someone else's sandstone — is a misrepresentation. To swap: add an
   `image` field per stone and replace `<StoneSwatch>` with `<img>`; the layout
   is unchanged.

3. **Confirm the catalogue.** SRS §7.1 marked SKU count and per-stone spec
   fields TBD. The 18 listed are real North-Indian varieties standing in as a
   representative range.

4. **Approve or replace the journal copy.** `src/data/posts.js` holds editorial
   drafts written from the client's stated expertise, for layout review only.
   They must not publish under Simant's name unapproved. **Note:** an earlier
   draft claimed 8Slabs attended STONA and the Xiamen Stone Fair — real events —
   and dated posts before the company existed (established 2026). Those were
   removed. Exhibition entries must come from the client; the Journal shows an
   honest empty state until they do.

5. **Logo.** `src/components/BrandMark.jsx` is a placeholder built from the
   brand name (SRS §7.3: no vector logo exists). Replace with the real asset.

6. **Team profiles.** SRS §7.3 answered "Y" but supplied no names or photos.
   `/about` carries the founder card and an honest gap — no invented colleagues.

7. **Resolve the SRS contradiction.** §5 says "generate quote/enquiry requests"
   = **N** and §8 declines an RFQ form = **N**, but §6 asks for a "Contact Us /
   Request a Quote" page = **Y**. Built on the reading that *enquiries run
   through WhatsApp/phone, not a web form* — so `/contact` has no form (a form
   with no backend is worse than none). Confirm.

8. **Define the "Other" page.** SRS §6 marks "Other (specify in Notes)" = **Y**
   with no note. Nobody knows what it is.

---

## Deferred

- **Multi-language.** SRS §4 asks for "English and the European languages"
  without naming them. Shipped English-only and i18n-ready: all copy is
  centralised in `src/data/`, so a translation layer drops in without a
  rewrite. Confirm target markets first — §4 answered "NA" for current export
  regions, so nobody yet knows which languages matter.

---

## Link previews

`public/og.png` (1200×630) is the WhatsApp/LinkedIn preview card. It is a baked
static asset rather than Next's `opengraph-image` route, on purpose: that route
exports to `/opengraph-image` with **no file extension**, and most static hosts
serve extensionless files as `application/octet-stream`, which WhatsApp's
scraper rejects — silently killing the preview everywhere except Vercel. Since
the host isn't chosen yet (SRS §9), a plain `.png` is the portable choice.

Regenerate it via `scripts/opengraph-image.source.jsx` — instructions are in
that file's header.

Per-route titles and descriptions come from each page's `metadata` export, so
every page previews as itself.
