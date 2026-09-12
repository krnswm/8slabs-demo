# 8Slabz — Website

Marketing website for **8Slabz** (Simant Vijai) — exporter of Indian natural
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
npm run preview    # http://localhost:4321 — the BUILT site from /out
```

`npm run build` produces plain static files in `/out`. Deploy that folder to
Netlify, Vercel, Cloudflare Pages, or any cPanel/Apache host. No server, no
Node runtime, no database.

### Visual QA (dev only)

With the preview server running, these screenshot the real build and report any
horizontal overflow — the reliable way to check a layout change actually landed:

```bash
node scripts/shoot.mjs                     # desktop / laptop / mobile + overflow report
node scripts/shot-at.mjs <url> <out.png> [w] [h] [scrollToSelector]
node scripts/check-hero-bg.mjs [url] [w] [h]   # contrast over the hero photo
node scripts/hero-image.mjs <source.png>       # re-encode the hero image + scrim analysis
```

`check-hero-bg.mjs` hides the hero's text, nav and WhatsApp button, screenshots
what remains, and measures the **real** background pixels under each text zone.
This is the only trustworthy way to check contrast over a photograph — token
maths cannot see a highlight in an image, and sampling a normal screenshot just
measures the text itself.

They drive your installed Chrome via `puppeteer-core` (a devDependency; nothing
ships to the built site). Note: the plain `chrome --headless --screenshot` CLI
does **not** reliably apply `--window-size`, so it silently produces
desktop-width renders cropped to a phone size — use these scripts instead.

### If the dev server feels slow (2–3s to change pages)

That slowness is the **dev server**, not the site. `next dev` compiles each
route the first time you visit it — the first click to `/about` builds `/about`
on the spot, which is the 2–3s pause. It is a one-time, dev-only cost.

Two things make it worse here, both fixable:

- **The project is inside a OneDrive-synced folder.** OneDrive continuously
  syncs `.next` (a 100MB+ cache Next rewrites on every keystroke). That fights
  the dev server for file locks and slows every rebuild. Fix: right-click
  `.next` and `node_modules` → *Always keep off this device* (Free up space),
  or move the project out of OneDrive (e.g. `C:\dev\8slabz`).
- **Stale dev servers.** Several `node` processes had been left running; kill
  stray `node.exe` in Task Manager before starting a fresh `npm run dev`.

**The real product has none of this.** In the production build the whole site
is static HTML and the nav links are prefetched, so page changes are
effectively instant. To feel the true speed: stop the dev server, then
`npm run build` followed by `npm run preview`, and click around
`http://localhost:4321`.

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

**The home hero.** A full-viewport photograph with an asymmetric editorial
structure over it: a mono title rail, the headline and actions in a protected
left column, and the material range as a rail across the base — every material
links to its section of the catalogue. (An earlier build used a "slab rack"
signature graphic; the client asked for it to be removed as unnecessary.)

**The scrim is measured, not eyeballed.** The photograph peaks at 0.64–0.83
luminance, so a *flat* scrim strong enough for cream text would need ~78% black
across the whole frame and would erase the image. Instead the scrim is
directional — heavy across the left column where the type sits, releasing to
~12% on the right so the stone reads — with separate bands protecting the
full-width top and bottom rails. Verified against the real rendered pixels via
`scripts/check-hero-bg.mjs`; do not adjust these gradients without re-running it.

**Liquid glass nav.** A floating pill, not a bar: the wrapper takes no layout
height (`margin-bottom: -var(--nav-h)`) so the glass sits *over* the hero and has
something to refract. What sells it is the edge treatment — a specular top rim,
an inner light bounce at the base, a raking sheen across the face, and a real
drop shadow. Held at 62% cream: transparent enough to see the page move
underneath, opaque enough that the near-black links still clear AA over the
darkest thing they pass over (measured 4.88:1 over the hero photograph).

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
one tonal break — the dark home hero and the closing CTA band. Every surface
carries ~4% fractal grain (`--grain`); dark surfaces use `--grain-dark` at ~13%,
because 4% noise over near-black is invisible and renders as a flat fill.

**Section rhythm.** Three scales (`--section-sm/-/-lg`), not one. The catalogue
band gets `--lg`; supporting sections get `--sm`. Equal-height bands have no
hierarchy no matter how good their contents.

**Motion — one gesture.** No GSAP (its SplitText/Flip are paid). The whole site
shares one move: everything is *set into place like a slab* — lowered onto its
bottom edge with a slight weight-settle overshoot (`--ease-set`). The h1 gets a
single saw-cut clip reveal, once per visit — note the clip lives *inside* a
`prefers-reduced-motion: no-preference` query, because as a base state it left
the headline invisible whenever the animation did not run. Cards lean in
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
| Business name, contact, Instagram, values, supply chain | `src/data/site.js` |
| Stone families (definition / applications / finishes) | `families` in `src/data/stones.js` |
| Individual stones | `stones` in `src/data/stones.js` |
| Signature stones (home strip) | `RACK_IDS` in `src/data/stones.js` |
| Hero photograph | `public/hero-*.{avif,webp}` |
| Colour, type, spacing, motion tokens | `src/app/globals.css` (`:root`) |

Contact details live in one place — change them once and they propagate
site-wide.

---

> **`npm run build` does not start a server.** `output: 'export'` writes the
> whole site to `out/` as plain files and exits — that is the deliverable. There
> is deliberately no `npm start`, and `next start` refuses outright:
> `"next start" does not work with "output: export"`. To view the built site,
> run `npm run preview` and open `http://localhost:4321`.
>
> **Do not run `npm run build` while `npm run dev` is running.** Both write to
> `.next/`, and the build replaces the chunks the dev server is holding open.
> The dev server then 500s every route with `Cannot find module './833.js'`,
> which looks like a code fault and is not one. Stop dev first; if it has
> already happened, delete `.next/` and restart.

## Languages

Eight locales. English is served from the root; the rest are path-prefixed:

| | | | |
|---|---|---|---|
| `/` English | `/es/` Español | `/vi/` Tiếng Việt | `/zh/` 中文 |
| `/ru/` Русский | `/pl/` Polski | `/it/` Italiano | `/ar/` العربية (RTL) |

**Where things live**

| What | File |
|---|---|
| Locale list, `dir`, path helper | `src/i18n/config.js` |
| Translations (one file per locale) | `src/i18n/locales/*.js` |
| Titles, descriptions, hreflang | `src/i18n/metadata.js` |
| Per-script fonts | `src/i18n/fonts.js` |
| Page bodies (shared by all locales) | `src/views/*.jsx` |

Route files are one-liners that render a view with a locale, so the markup
exists once rather than eight times.

**Why path-prefixed and not a client-side toggle.** The whole point of
translating is that a Spanish buyer searching in Spanish finds the Spanish
page. That needs a real URL per language plus `hreflang` tags, which
`src/i18n/metadata.js` emits for every page. A toggle that swaps strings in
place is invisible to search engines and can't be shared.

**Visitors reach their own language automatically.** A 580-byte inline script
in `<head>` (`src/i18n/preference.js`) routes a first-time visitor by
`navigator.languages`, and thereafter by whatever they last picked from the
switcher. It runs before first paint, because a redirect after render shows a
flash of English — and on Arabic, a flash of the whole layout in the wrong
direction. It is client-side because `output: export` means `/` is one static
file on a CDN: `Accept-Language` never reaches us.

Three guards stop it trapping anyone:

| Guard | Stops |
|---|---|
| A locale prefix in the URL wins outright | An emailed `/vi/catalogue/` link opening in the buyer's own language instead |
| Only runs when the referrer is not this origin | Clicking "English" from `/es/` bouncing straight back to Spanish |
| Only ever redirects *away* from `/` | Any pair of URLs redirecting to each other |

The referrer guard is what makes the escape work when storage is blocked
(Safari private mode throws on `setItem`), where the remembered choice cannot.

`npm run locale:check` proves all of it against the built site — 16 assertions,
including the escape-from-Spanish path with storage disabled and a back-button
loop check. Run `npm run preview` first, then
`npm run locale:check` (it defaults to port 4321).

**Residual SEO note.** Google crawls predominantly from the US with
`Accept-Language: en`, so it sees English at `/` and follows the `hreflang`
tags to the rest. If it ever crawled with another language it would be
redirected like any visitor; the `hreflang` set is what keeps that from
mattering. Auto-redirecting is acceptable to Google *provided* users can
override it, which the switcher does.

**Two root layouts.** `src/app/(en)/` and `src/app/[locale]/` each have their
own, because only a root layout may render `<html>` and `lang`/`dir` must be
correct in the *served* markup — setting them client-side would leave crawlers
and screen readers seeing English on the Arabic page. Both share
`src/components/SiteShell.jsx`.

**Fonts follow the script.** Archivo and Newsreader carry Latin/Latin-Ext and
Vietnamese. They contain no Arabic, Chinese or Cyrillic glyphs at all, so those
locales switch to Noto faces via `:lang()` — nobody downloads a font for a
script they aren't reading. (Newsreader has no Cyrillic subset; asking for one
is a build error.)

**RTL** is handled by logical properties, so almost nothing needed mirroring.
The exceptions are physical-direction things: the hero's `linear-gradient`
scrim and the photograph flip together via `[dir='rtl'] .hero__media`, and the
catalogue's alternating sides invert. Verify with
`node scripts/check-hero-bg.mjs http://localhost:3000/ar/` — it is
direction-aware and samples the half the text actually occupies.

**Consistency is enforced.** `npm run build` runs `scripts/check-i18n.mjs`
first and fails if any locale drifts from the English key shape. A missing key
doesn't throw — it renders `undefined` mid-sentence in a language nobody on the
team reads.

### Translations need native review before launch

Every non-English locale is marked `meta.reviewed: false`. They are good enough
to demo and to lay out against, but the site makes **commercial claims** —
delivery commitments, quality guarantees, material specifications — to buyers
committing to container-scale orders. Have a native speaker check the wording
in each market before launch, then flip `reviewed` to `true`.

Deliberately **not** translated, and correct to leave alone: stone trade names
(Kandla Grey, Makrana White — ordered by those names in every market), place
names, the brand, phone and email.


---

## Before launch — required

1. **Set the domain.** `site.url` in `src/data/site.js` is `https://8slabz.com`,
   a placeholder (SRS §9: no domain registered). This builds the absolute URLs
   for the OpenGraph tags — link previews break until it is real.

2. **Confirm rights to the hero photograph.** `public/hero-*.{avif,webp}` are
   generated from a supplied `Bg.png`. **Its provenance and licence have not
   been confirmed** — if it is stock or AI-generated it needs a commercial
   licence before launch. It is used as *atmosphere* only, never captioned as
   8Slabz' own material, which is the defensible use; do not reuse it as a
   catalogue image. Source is 1536×1024, so it upscales on large retina
   displays — a higher-resolution original would be better. Re-encode with
   `node scripts/hero-image.mjs <file>`.

3. **Real slab photography.** Every stone face is a *generated CSS texture*
   (`StoneSwatch`), labelled "Placeholder — not a photograph" on screen. This
   labelling is deliberate and must stay until real photos land: in natural
   stone, appearance varies by quarry batch and buyers commit to containers
   against what they see. Shipping a generated texture unlabelled — or a stock
   photo of someone else's sandstone — is a misrepresentation. To swap: add an
   `image` field per stone and replace `<StoneSwatch>` with `<img>`; the layout
   is unchanged.

4. **Approve the five drafted family descriptions.** The catalogue now leads
   with the material (client feedback). **Granite is the client's own copy,
   verbatim**; Marble, Sandstone, Quartzite, Limestone and Slate are drafted in
   their exact format and need Simant's sign-off — see `families` in
   `src/data/stones.js` (each carries an `approved` flag). Per their
   instruction, **no stone counts appear anywhere on the site.**


6. **Replace the placeholder business email.** `site.email` is
   `hello@8slabz.com` — a **placeholder that does not exist yet**, so mail sent
   to it will bounce. Client feedback: "Email we will make of business and not
   use the personal one." The personal Gmail has been removed from the site
   entirely (it survives only in a code comment explaining why). Swap in the
   real mailbox as soon as it is created.

7. **Logo.** `src/components/BrandMark.jsx` is a placeholder built from the
   brand name (SRS §7.3: no vector logo exists). Replace with the real asset.

8. **Team profiles.** SRS §7.3 answered "Y" but supplied no names or photos.
   `/about` carries the founder card and an honest gap — no invented colleagues.

9. **Resolve the SRS contradiction.** §5 says "generate quote/enquiry requests"
   = **N** and §8 declines an RFQ form = **N**, but §6 asks for a "Contact Us /
   Request a Quote" page = **Y**. Built on the reading that *enquiries run
   through WhatsApp/phone, not a web form* — so `/contact` has no form (a form
   with no backend is worse than none). Confirm.

10. **Define the "Other" page.** SRS §6 marks "Other (specify in Notes)" = **Y**
   with no note. Nobody knows what it is.

---

## Client feedback round 1 — what changed

From the client's written feedback (`Feedbacck on the site.docx`):

| Feedback | Done |
|---|---|
| "Darker background on the home, lighter inside" | Home hero + closing CTA band use the brand near-black `#1F1F1F`; interior heroes moved to the lighter page cream |
| New home-page copy | Applied verbatim — headline, materials paragraph, and "You specify the stone…" |
| New About copy | Applied verbatim, including the new one-person-operation closing |
| "Will this line be essential?" (8 signature stones / 18 in the catalogue / …) | Removed — it also contradicted the no-counts instruction below |
| Catalogue by material, "without specifying the number of stones" | Rebuilt as six family sections (definition + Applications + Finishes) with a representative stone plate, sides alternating left/right. All counts and the SKU filter removed |
| "Journal we can avoid… use a link to Instagram" | `/journal` deleted; `/socials` reel wall added in its place |
| "Just give WhatsApp and no address" | Address removed from contact + footer; WhatsApp and click-to-call retained |
| "Email we will make of business, not the personal one" | Personal Gmail removed sitewide; placeholder business address in place pending the real one |

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
