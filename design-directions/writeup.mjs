// The written half of the comparison page.

export const writeups = {
  a: {
    oneLiner: "The portfolio as an annotated spec. It shows the structure behind the work.",
    rationale:
      "For hiring managers and design-system or accessibility leads who look for rigor. The site reads like one of Melissa's engineering handoffs: labeled structure, numbered figures, and a visible heading outline. That outline is the same idea that made the matrix-schedule text view work. Its structure is the closest of the three to the current site, so it would cost the least to build.",
    system: [
      ["Typography", "Public Sans, the U.S. Web Design System typeface, for headings (800) and text (400/600). IBM Plex Mono for annotations: labels, figure numbers, status, heading-level tags. Major-third scale on a 17px body."],
      ["Layout", "12-column frame up to 74rem with faint column guides behind the hero. Work is an index of rows. Case studies pair a sticky “On this page” outline with a 44rem text column."],
      ["Spacing", "Tight inside components, with 0.5–1rem padding and 1px rules. Wide between sections, 3–6rem. Rules mark the grid instead of cards."],
      ["Color", "White and near-black, with one annotation magenta for links, labels, chips and focus. A cool gray panel for hover and spec blocks."],
      ["Imagery", "The existing tile drawings redrawn as outlined wireframes inside crop marks. Screenshots keep a 1px frame and get “Fig. n” captions."],
      ["Interaction", "Underlines thicken from 1px to 3px on hover. Index rows tint gray and their crop marks turn magenta on hover or focus. Focus is a 3px magenta outline with a 3px offset. Nothing moves."],
    ],
    pages: [
      ["Home", "Left-aligned headline over column guides, with “For everyone.” in magenta. The four offers sit in a 2×2 grid with mono labels (Design systems, Accessibility, AI prototyping, Leadership). A black “Get in touch” button and a tagged note."],
      ["Selected work", "An index of rows separated by rules. Each row has a crop-marked line drawing, the category in mono magenta, the title, a “Work in progress” badge where it applies, and the description. The whole row is the link target."],
      ["Case study", "A back link, then the title and summary. A spec table lists Client, Year, Role and Tags, and the headline metric sits beside it. On wide screens a sticky outline lists each H2 with its level tag. Figures are numbered."],
    ],
    risks: [
      ["Magenta could read as an error color.", "The site has no error states, and status is always written out (“Work in progress”) with an icon, so no meaning depends on hue."],
      ["Monospace labels are harder to read at small sizes.", "Mono is never below 14px. It's used only for short labels, never for paragraphs."],
      ["A sticky outline can cover content or become unreachable when zoomed.", "It is sticky only when the window is at least 64rem wide and 40rem tall. It scrolls inside itself if it's taller than the window. At 200–400% zoom it falls back into the page flow above the article."],
      ["Visible “H2” tags could confuse screen-reader or voice-control users.", "The tags sit outside the links and are hidden from assistive tech, so each link's name matches its visible heading text."],
      ["Hairline rules carry structure.", "Rules are decorative. Anything interactive or meaningful uses the 4.4:1 border token, and a text label never depends on a rule."],
      ["Stretched row links make focus hard to see.", "The title link keeps its own outline, and the whole row also tints when focus is inside it."],
    ],
  },
  b: {
    oneLiner: "The portfolio as a magazine long-read. It leads with people and outcomes.",
    rationale:
      "For executives and hiring leads who read for story and impact rather than for process. It puts the people in front: screen-reader users, substitute teachers, the counselor's note. A chalkboard green ties the look to education without being literal. This is the most memorable of the three and the furthest from a typical design-systems portfolio.",
    system: [
      ["Typography", "Newsreader, a serif with optical sizes, for headlines and body text at 19px with 1.6 line height. Hanken Grotesk for kickers, bylines, captions and controls."],
      ["Layout", "A full-width green band opens the page. Work is a set of features that alternate drawing and text sides. Case studies use one 38rem reading column; figures break out wider and the key quote spans the full width."],
      ["Spacing", "Generous: 4–6rem between features, with large type and few rules."],
      ["Color", "Chalkboard green with chalk-white text and chalk-yellow highlights, white reading pages, and green links."],
      ["Imagery", "Chalk-line versions of the drawings on green panels, shown large. Screenshots run wider than the text with sans captions below."],
      ["Interaction", "Underlines go from 1px to 2px. Feature panels get a green halo on hover or focus. The one animation is a chalk underline that draws under “For everyone.” on load, and only when reduced motion isn't requested. Focus turns yellow on green and green on white."],
    ],
    pages: [
      ["Home", "A tall green hero with a large serif headline. “For everyone.” is set in yellow italic with a chalk underline. The intro and the four offers sit in two columns, followed by a yellow pill button."],
      ["Selected work", "Five large features alternating left and right. Each has a chalk drawing on green, a small uppercase category kicker, the title as a serif headline, an optional status line, and the description as a deck."],
      ["Case study", "Tags as a kicker line, then a big serif title, the summary as a standfirst, and a byline. The headline metric is set in italic green. Body text sits in one column; screenshots run wider, and the counselor's quote becomes a full-width green band."],
    ],
    risks: [
      ["Serif body text can be harder for some low-vision and dyslexic readers.", "Newsreader is set at 19px with 1.6 line height and about 65 characters per line. If testing shows a problem, switching the body to Hanken Grotesk is a single token change."],
      ["The alternating layout changes reading order when zoomed.", "Drawings are decorative and hidden from assistive tech, and the DOM order is the same for every feature. Below 52rem everything stacks into one column."],
      ["One focus color can't work on both green and white.", "A --focus token switches per surface: yellow on green at 7.9:1, green on white at 7.6:1."],
      ["Large display type can overflow at 320px.", "Sizes use clamp() with small minimums, and long words wrap."],
      ["Motion on load.", "The chalk underline animates only under prefers-reduced-motion: no-preference. At rest it's fully drawn, and no content waits for an animation."],
      ["A long hero pushes the work further down the page.", "The hero is sized to its content, not to the viewport, and the skip link and Work nav link go straight to the content."],
    ],
  },
  c: {
    oneLiner: "The portfolio as a design-system kit. Tiles, tokens, and her own focus ring.",
    rationale:
      "For product and design-system leaders hiring for scale. The site is visibly built from a token system: 100-level tints with 900-level labels, chips, and the three-band focus ring from the design-system case study. It uses Atkinson Hyperlegible, a typeface designed for low-vision readers. It's friendly the way education products are, and it's the fastest of the three to scan.",
    system: [
      ["Typography", "Atkinson Hyperlegible Next (Braille Institute) for everything; Atkinson Hyperlegible Mono for chips and labels. Weights 400, 700 and 800."],
      ["Layout", "A tile grid on a cool canvas. The hero puts the statement beside four capability tiles. Work is a two-column grid where the first study spans both columns. Case studies have a tinted header panel, a row of fact tiles, and a white sheet for the article."],
      ["Spacing", "Even 0.75–1.25rem gaps between tiles and 1.25–1.5rem inside them. Radius is 14px on tiles and 10px on inner parts."],
      ["Color", "navy-500 (#1162EE) from her design system as the action color. Each study gets a tint (blue, green, amber or violet 100) with a matching 900-level label."],
      ["Imagery", "The existing tile drawings enlarged and filled in each study's tint, plus a new tile for AI prototyping."],
      ["Interaction", "Tiles lift 2px and their border turns blue on hover. The lift is off when reduced motion is requested. Focus is the three-band ring (white, blue, light blue) on the link or around the whole tile, with a transparent outline that shows up in forced-colors mode."],
    ],
    pages: [
      ["Home", "The statement on the left with “For everyone.” in blue. On the right are four tinted capability tiles with line icons and mono labels. Below sit a blue button and an info panel for the work-in-progress note."],
      ["Selected work", "White tiles with a tinted drawing on top, a category chip, the title, a status chip with an icon, and the description. The first study is a wide horizontal tile."],
      ["Case study", "A tinted header panel holds the back link, tag chips, title and summary. Below it are fact tiles for Client, Year and Role; the headline metric gets a wide blue tile. The article sits on one white sheet. Quotes and metrics appear as tinted panels, and stages as numbered rows."],
    ],
    risks: [
      ["Color-coded categories.", "Every tile also carries a text chip naming its category, so the tint only repeats what the text says."],
      ["Text on tinted surfaces loses contrast.", "Every text color was measured on every tint. The lowest body pairing is 6.4:1. The tightest pair is a link on the light-blue panel at 4.57:1; keep links off that panel or darken it if the palette changes."],
      ["Box-shadow focus rings disappear in Windows High Contrast.", "A transparent outline goes with every ring. Forced-colors mode makes it visible, and the shared stylesheet forces a CanvasText outline there."],
      ["Whole-tile links can hide which element has focus.", "When the title link has focus, the whole tile gets the three-band ring (:has(a:focus-visible)), and its border turns blue as a fallback."],
      ["Hover lift.", "It runs only under prefers-reduced-motion: no-preference."],
      ["Pill-shaped nav links can look like tabs.", "They are ordinary links with aria-current=\"page\". The current page is shown by fill and border, not color alone."],
    ],
  },
  d: {
    oneLiner: "A's annotated structure set in B's serif and green. Rigor with editorial contrast.",
    rationale:
      "For the design-system and accessibility leads A was made for, with the warmth and contrast that make B stick with readers who aren't designers. It keeps A's evidence of rigor: a spec table, a heading outline, and numbered figures. Everything is set in Newsreader, and chalkboard green frames the site (hero, case-study header, quotes, footer) while white pages carry the reading. Its structure matches A's, so it costs about as little to build.",
    system: [
      ["Typography", "Newsreader for headings and body text at 19px with 1.6 line height. IBM Plex Mono for labels, nav, buttons, figure numbers and heading-level tags. Two families, no third."],
      ["Layout", "A's 12-column frame. The hero is green with chalk column guides, work is an index of rows, and case studies open with a green header holding the spec table. Below that, a sticky outline sits beside a 40rem reading column."],
      ["Spacing", "A's rhythm of rules, tight components and wide sections, with B's larger type."],
      ["Color", "Chalkboard green with chalk-white and chalk-yellow on the bands. White pages use green for links and labels, and a pale green wash for hover states and badges."],
      ["Imagery", "Chalk-line drawings on small green panels inside crop marks. Screenshots are framed and numbered as in A."],
      ["Interaction", "Underlines thicken on hover. Index rows tint pale green and their crop marks turn yellow. Focus is a 3px outline, yellow on green and green on white. One chalk underline draws on load, and only when reduced motion isn't requested."],
    ],
    pages: [
      ["Home", "A green hero over chalk column guides with a large serif headline. “For everyone.” is set in yellow italic with a chalk underline. The four offers sit in a 2×2 spec grid with yellow mono labels, followed by a yellow button and a tagged note."],
      ["Selected work", "A white index. Each row has a chalk drawing on a green panel in crop marks, the category in green mono, a serif title, a “Work in progress” badge where it applies, and the description."],
      ["Case study", "A green header holds the back link, serif title and summary. Below it, the spec table lists Client, Year, Role and Tags, with the headline metric in yellow italic beside it. The white body has the sticky heading outline and numbered figures, and the counselor's quote is a green panel."],
    ],
    risks: [
      ["Serif body text can be harder for some low-vision and dyslexic readers.", "Body text is 19px with 1.6 line height and about 65 characters per line, and labels and controls use mono. If testing shows a problem, switching the body to a sans serif is one token change."],
      ["Focus has to show on two very different surfaces.", "A --focus token changes with the surface: yellow on green at 7.9:1, green on white at 7.6:1. Pale-green row hovers were measured too (6.7:1)."],
      ["Text over the chalk column guides.", "Text was measured against the guide-line color as well as the green: chalk 9.1:1, secondary chalk 6.3:1, yellow 6.4:1."],
      ["The sticky header and outline can hide focus or content when zoomed.", "Same rules as A: sticky only on large windows, the outline scrolls inside itself, and focus visibility was measured."],
      ["Thin rules on green can disappear.", "Borders that carry meaning on green use a 3.9:1 rule color; the column guides are decorative only."],
      ["Motion on load.", "The chalk underline animates only under prefers-reduced-motion: no-preference and is fully drawn at rest."],
      ["Visible “H2” tags in the outline.", "As in A, they sit outside the links and are hidden from assistive tech."],
    ],
  },
};

export const comparison = `<div class="table-scroll"><table class="compare">
<caption class="sr-only">How the four directions compare</caption>
<thead><tr><th scope="col"><span class="sr-only">Aspect</span></th><th scope="col">A · Handoff</th><th scope="col">B · Long Read</th><th scope="col">C · Component Kit</th><th scope="col">D · Hybrid</th></tr></thead>
<tbody>
<tr><th scope="row">Says about Melissa</th><td>Rigorous; shows her working</td><td>Tells the human story and impact</td><td>Thinks in systems; approachable</td><td>Rigorous and warm</td></tr>
<tr><th scope="row">Best audience</th><td>Design-system and accessibility leads</td><td>Executives and non-design hiring leads</td><td>Product and design-system leaders</td><td>Design leads and non-design leads alike</td></tr>
<tr><th scope="row">Typography</th><td>Public Sans + IBM Plex Mono</td><td>Newsreader serif + Hanken Grotesk</td><td>Atkinson Hyperlegible Next + Mono</td><td>Newsreader serif + IBM Plex Mono</td></tr>
<tr><th scope="row">Work list</th><td>Index rows with line drawings</td><td>Alternating magazine features</td><td>Tinted tile grid</td><td>Index rows with chalk drawings on green</td></tr>
<tr><th scope="row">Case study</th><td>Spec table + sticky heading outline</td><td>One reading column, breakout figures, quote band</td><td>Tinted header, fact tiles, white sheet</td><td>Green spec header + sticky heading outline</td></tr>
<tr><th scope="row">Lowest text contrast</th><td>6.9:1 (chip)</td><td>6.7:1 (caption on wash)</td><td>4.57:1 (link on light blue); body text ≥ 6.4:1</td><td>6.3:1 (secondary text over a guide line)</td></tr>
<tr><th scope="row">Main accessibility risk</th><td>Sticky outline when zoomed</td><td>Serif body for some readers</td><td>Color-coded tiles and box-shadow focus</td><td>Serif body for some readers; focus on two surfaces</td></tr>
<tr><th scope="row">Motion</th><td>None</td><td>One load animation (reduced-motion safe)</td><td>Hover lift (reduced-motion safe)</td><td>One load animation (reduced-motion safe)</td></tr>
<tr><th scope="row">Change from today</th><td>Low: same list structure, new type and details</td><td>High: new layouts and a serif voice</td><td>Medium: new grid and tile components</td><td>Low to medium: A structure, new type and green bands</td></tr>
<tr><th scope="row">Distinctiveness</th><td>High among design-system portfolios</td><td>Highest overall</td><td>Moderate; tile grids are common</td><td>High</td></tr>
</tbody></table></div>`;

export const recommendation = `<div class="callout">
<p><strong>With D on the table, I'd lean toward D, Hybrid.</strong></p>
<p>D keeps what made A my earlier pick. The heading outline, spec table and numbered figures match how Melissa documents work, and the structure is close to today's list layout, so it carries little risk to features that already work. It adds the two things you liked in B: strong contrast between green and white, and a serif voice. Those make it more memorable than A for readers who aren't designers.</p>
<p>Choose A if you want the plainest, most neutral version of that structure. Choose B if the story matters more than the system. Choose C if the target roles are mostly design-system leadership. The choice is yours. The live site is unchanged; the prototypes live in <code>design-directions/</code>.</p>
</div>`;

// Filled in after testing; see test.mjs.
import { readFileSync } from "node:fs";
export const verification = readFileSync(new URL("./verification.html", import.meta.url), "utf8");
