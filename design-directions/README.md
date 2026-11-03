# Design directions (exploration, not production)

Visual-direction prototypes for the portfolio. Nothing here is built or
deployed: the Next app only uses `app/`, `components/`, `lib/` and `public/`.
These files read the real copy from `lib/selected-work.ts`, `lib/projects.ts`
and `lib/design-tokens.ts`, so the mock-ups never drift from the live text.

Published comparison page (private): https://claude.ai/artifact/Ctmg8wVGtdLJrSRNPjmdnw
It shows all four directions and opens on D beside A and B.

## Directions

- **A · Handoff.** The portfolio as an annotated spec. Public Sans + IBM Plex
  Mono, white with magenta annotations, a work index with line drawings in
  crop marks, a spec table, a sticky heading outline, and numbered figures.
- **B · Long Read.** An editorial long-read. Newsreader serif + Hanken
  Grotesk, chalkboard-green bands with chalk-yellow highlights, alternating
  features, a single reading column, and a full-width quote band.
- **C · Component Kit.** A token-built tile grid. Atkinson Hyperlegible Next
  + Mono, tinted tiles, navy-500 actions, and the three-band focus ring.
- **D · Hybrid.** A's structure (spec hero with column guides, work index,
  spec table, sticky heading outline, numbered figures) in B's Newsreader serif
  and chalkboard-green/white contrast, with IBM Plex Mono for labels. Same
  markup as A; `d.css` carries the difference.

Melissa likes B's contrast and serif type, and D was built from that. On 2026-11-03 she chose **Direction A** for the production site. Keep all four prototypes here for reference.

## Build and test

```sh
cd design-directions
node --no-warnings build.mjs          # writes ./out (gitignored)
open out/index.html                   # or open out/<a|b|c|d>/home.html

cd tools && npm install               # puppeteer-core + axe-core, local to this folder
node test.mjs  "$PWD/../out" "$PWD/../out/shots"   # axe, 320px reflow, text spacing, focus, reduced motion
node focus.mjs "$PWD/../out"                       # focus not obscured by sticky header (2.4.11)
node shell.mjs "$PWD/../out" "$PWD/../out/shots"   # comparison page, light and dark
```

`test.mjs` and `shell.mjs` expect Chrome at
`/Applications/Google Chrome.app`. `palettes.mjs` holds every color pair
each direction uses; the build fails loudly if one drops below AA.

## Testing the Next site

The `site-*.mjs` scripts in `tools/` run the same kinds of checks against the
built site. Serve `out/` under `/portfolio` first (as GitHub Pages does); the
scripts set PasswordGate's localStorage flag before each page loads.

```sh
npm run build                                        # in the repo root
cd design-directions/tools
node site-test.mjs http://localhost:4321/portfolio <shots dir>       # axe, ring on every Tab stop, header occlusion, clicks, forced colors, reflow, motion
node site-behavior.mjs http://localhost:4321/portfolio               # gate, menu + Escape, aria-current, basePath, figures, prev/next, drafts
node --no-warnings site-contrast.mjs                                 # every color pair, read from app/globals.css
node site-ring-shots.mjs http://localhost:4321/portfolio <shots dir> # ring close-ups, normal and forced colors
node site-shot.mjs http://localhost:4321/portfolio <shots dir> 1280 /:home
```

`site-behavior.mjs` reads `NEXT_PUBLIC_PASSWORD` from `.env.local` to test
unlocking; it never prints it.

## Lessons from the first pass

- Single-column CSS grids need `grid-template-columns: minmax(0, 1fr)`, or a
  long word widens the page at 320px.
- Don't put `grid-area` on generic class names like `.lede`; inside another
  grid the name creates implicit columns.
- Atkinson Hyperlegible Next uses a slashed zero by default.
  `font-feature-settings: "ss01"` gives a plain zero for body text.
- Full-page screenshots misplace sticky elements; check them in a normal
  scrolled viewport.
- `npm run lint` lints every file, including these `.mjs` files. If that
  gets noisy, add `"design-directions/**"` to `globalIgnores` in
  `eslint.config.mjs`.
