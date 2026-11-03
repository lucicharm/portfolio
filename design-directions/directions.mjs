import {
  home, esc, slugify, splitTitle, caseHref, illo, blocks, figure, projectNav,
  wipNotice, progressIcon, topLevelWork,
} from "./shared.mjs";

const workLink = (item, { catClass, nameClass, visibleColon }) => {
  const { cat, rest } = splitTitle(item.title);
  return `<a href="${caseHref(item.slug)}"><span class="${catClass}">${esc(cat)}${
    visibleColon ? ":" : `<span class="sr-only">:</span>`
  }</span> <span class="${nameClass}">${esc(rest)}</span></a>`;
};

const sectionsHtml = (d, opts) =>
  d.sections
    .map((s) => {
      const id = `section-${slugify(s.heading)}`;
      return `<section class="cs-section" aria-labelledby="${id}"><h2 id="${id}">${esc(s.heading)}</h2>
${blocks(s.blocks, opts)}
</section>`;
    })
    .join("\n");

const emptyBody = `<p class="b-p cs-empty">Work in progress. More details coming soon.</p>`;

// ─── A · Handoff ──────────────────────────────────────────────────────────
export const A = {
  id: "a",
  letter: "A",
  name: "Handoff",
  fonts:
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Public+Sans:ital,wght@0,400;0,600;0,800;1,400&display=swap",

  home() {
    const rows = topLevelWork
      .map(
        (item) => `<li><article class="entry">
  <div class="entry-fig"><span class="crop" aria-hidden="true"></span>${illo(item)}</div>
  <div class="entry-body">
    <h3 class="entry-title">${workLink(item, { catClass: "entry-cat", nameClass: "entry-name", visibleColon: true })}</h3>
    ${item.inProgress ? `<p class="badge">${progressIcon}Work in progress</p>` : ""}
    <p class="entry-desc">${esc(item.description)}</p>
  </div>
</article></li>`,
      )
      .join("\n");
    return `<section class="hero" aria-labelledby="hero-heading">
  <div class="wrap hero-inner">
    <p class="eyebrow">${esc(home.eyebrow)}</p>
    <h1 id="hero-heading" class="hero-title">${esc(home.h1a)}<br><span class="hero-em">${esc(home.h1b)}</span></h1>
    <p class="lede">${esc(home.intro)}</p>
    <ul class="offers" role="list">${home.offers
      .map((o, i) => `<li><p class="offer-label">${esc(home.offerLabels[i])}</p><p>${esc(o)}</p></li>`)
      .join("")}</ul>
    <p class="hero-actions"><a class="btn" href="contact.html">${esc(home.cta)}</a></p>
    <p class="note"><span class="note-tag">Note</span> ${esc(home.wip)}</p>
  </div>
</section>
<section id="selected-work" class="work" aria-labelledby="selected-work-heading">
  <div class="wrap">
    <div class="work-head">
      <h2 id="selected-work-heading">${esc(home.workHeading)}</h2>
      <div class="work-intro">${home.workIntro.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    </div>
    <ul class="index" role="list">
${rows}
    </ul>
  </div>
</section>`;
  },

  case(d) {
    const counter = { n: 0 };
    const figLabel = (n) => `<span class="fig-no">Fig. ${n}</span> `;
    const toc = d.sections.length
      ? `<nav class="toc" aria-labelledby="toc-heading"><p id="toc-heading" class="toc-title">On this page</p><ol role="list">${d.sections
          .map(
            (s) =>
              `<li><span class="lvl" aria-hidden="true">H2</span><a href="#section-${slugify(s.heading)}">${esc(s.heading)}</a></li>`,
          )
          .join("")}</ol></nav>`
      : "";
    return `<header class="case-head">
  <div class="wrap">
    <p class="back-row"><a class="back" href="${d.back.href}"><span aria-hidden="true">← </span>${esc(d.back.label)}</a></p>
    ${d.inProgress ? wipNotice() : ""}
    <h1 class="case-title">${esc(d.title)}</h1>
    <p class="lede">${esc(d.summary)}</p>
    ${
      d.fields.length || d.tags.length || d.metric
        ? `<div class="spec">
      <dl class="spec-table">${d.fields.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}${
        d.tags.length
          ? `<div><dt>Tags</dt><dd><ul class="tags" role="list">${d.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></dd></div>`
          : ""
      }</dl>
      ${d.metric ? `<p class="metric"><span class="metric-value">${esc(d.metric.value)}</span> <span class="metric-label">${esc(d.metric.label)}</span></p>` : ""}
    </div>`
        : ""
    }
  </div>
</header>
${d.heroImage ? `<div class="wrap hero-figure">${figure(d.heroImage, figLabel(++counter.n))}</div>` : ""}
<div class="wrap case-body${toc ? "" : " no-toc"}">
  ${toc}
  <article class="article" aria-label="Project: ${esc(d.title)}">
${d.sections.length ? sectionsHtml(d, { figLabel, counter }) : emptyBody}
  </article>
</div>
${projectNav(d.slug)}`;
  },
};

// ─── B · Long Read ────────────────────────────────────────────────────────
export const B = {
  id: "b",
  letter: "B",
  name: "Long Read",
  fonts:
    "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap",
  headerClass: "board",
  footerClass: "board",

  home() {
    const features = topLevelWork
      .map(
        (item) => `<li><article class="feature">
  <div class="feature-art board">${illo(item)}</div>
  <div class="feature-text">
    <h3 class="feature-title">${workLink(item, { catClass: "kicker", nameClass: "headline", visibleColon: false })}</h3>
    ${item.inProgress ? `<p class="status">${progressIcon}Work in progress</p>` : ""}
    <p class="deck">${esc(item.description)}</p>
  </div>
</article></li>`,
      )
      .join("\n");
    return `<section class="hero board" aria-labelledby="hero-heading">
  <div class="wrap hero-inner">
    <p class="kicker">${esc(home.eyebrow)}</p>
    <h1 id="hero-heading" class="hero-title">${esc(home.h1a)}<br><span class="chalk">${esc(home.h1b)}</span></h1>
    <div class="hero-cols">
      <p class="lede">${esc(home.intro)}</p>
      <ul class="offers" role="list">${home.offers.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
    </div>
    <p class="hero-actions"><a class="btn" href="contact.html">${esc(home.cta)}</a></p>
    <p class="note">${esc(home.wip)}</p>
  </div>
</section>
<section id="selected-work" class="work" aria-labelledby="selected-work-heading">
  <div class="wrap work-head">
    <h2 id="selected-work-heading">${esc(home.workHeading)}</h2>
    <div class="work-intro">${home.workIntro.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
  </div>
  <ul class="wrap features" role="list">
${features}
  </ul>
</section>`;
  },

  case(d) {
    return `<header class="case-head">
  <div class="wrap measure">
    <p class="back-row"><a class="back" href="${d.back.href}"><span aria-hidden="true">← </span>${esc(d.back.label)}</a></p>
    ${d.inProgress ? wipNotice() : ""}
    ${d.tags.length ? `<ul class="tag-line" role="list">${d.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <h1 class="case-title">${esc(d.title)}</h1>
    <p class="standfirst">${esc(d.summary)}</p>
    ${d.fields.length ? `<p class="byline">${d.fields.map(([, v]) => `<span>${esc(v)}</span>`).join('<span aria-hidden="true"> · </span>')}</p>` : ""}
    ${d.metric ? `<p class="metric"><span class="metric-value">${esc(d.metric.value)}</span> <span class="metric-label">${esc(d.metric.label)}</span></p>` : ""}
  </div>
</header>
<article class="story" aria-label="Project: ${esc(d.title)}">
${d.heroImage ? `<div class="story-hero">${figure(d.heroImage)}</div>` : ""}
${d.sections.length ? sectionsHtml(d, {}) : `<section class="cs-section">${emptyBody}</section>`}
</article>
${projectNav(d.slug)}`;
  },
};

// ─── C · Component Kit ────────────────────────────────────────────────────
const tintFor = {
  "ai-prototyping": "violet",
  "accessibility-program": "blue",
  "accessible-design-systems": "neutral",
  "matrix-schedule-accessibility": "green",
  "sms-job-offers": "amber",
  "design-system-operations": "blue",
  "accessibility-programs-tooling": "blue",
  "acr-dashboard": "blue",
};
const capTints = ["blue", "green", "violet", "amber"];
// Small line icons for the capability tiles; decorative.
const capIcons = [
  `<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>`,
  `<circle cx="12" cy="4.5" r="2"/><path d="M4 8.5 h16 M12 8.5 v6 M12 14.5 l-4 7 M12 14.5 l4 7"/>`,
  `<path d="M8 7 l-5 5 l5 5 M16 7 l5 5 l-5 5 M14 4 l-4 16"/>`,
  `<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20 c0-4 3-6.5 6.5-6.5 s6.5 2.5 6.5 6.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14 c2.8 0 4.5 2 4.5 5"/>`,
];

export const C = {
  id: "c",
  letter: "C",
  name: "Component Kit",
  fonts:
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;600&family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,700;0,800;1,400&display=swap",

  home() {
    const tiles = topLevelWork
      .map(
        (item) => `<li class="tile tint-${tintFor[item.slug] ?? "neutral"}"><article>
  <div class="tile-art">${illo(item)}</div>
  <div class="tile-body">
    <h3 class="tile-heading">${workLink(item, { catClass: "chip", nameClass: "tile-title", visibleColon: false })}</h3>
    ${item.inProgress ? `<p class="status-chip">${progressIcon}Work in progress</p>` : ""}
    <p class="tile-desc">${esc(item.description)}</p>
  </div>
</article></li>`,
      )
      .join("\n");
    return `<section class="hero" aria-labelledby="hero-heading">
  <div class="wrap hero-grid">
    <p class="eyebrow">${esc(home.eyebrow)}</p>
    <h1 id="hero-heading" class="hero-title">${esc(home.h1a)} <span class="hero-em">${esc(home.h1b)}</span></h1>
    <p class="lede">${esc(home.intro)}</p>
    <ul class="caps" role="list">${home.offers
      .map(
        (o, i) => `<li class="cap tint-${capTints[i]}"><svg class="cap-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${capIcons[i]}</svg><p class="cap-label">${esc(
          home.offerLabels[i],
        )}</p><p class="cap-text">${esc(o)}</p></li>`,
      )
      .join("")}</ul>
    <p class="hero-actions"><a class="btn" href="contact.html">${esc(home.cta)}</a></p>
    <p class="info"><svg class="info-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="8.5"/><path d="M10 9 v5 M10 6 v.5"/></svg><span>${esc(home.wip)}</span></p>
  </div>
</section>
<section id="selected-work" class="work" aria-labelledby="selected-work-heading">
  <div class="wrap">
    <div class="work-head">
      <h2 id="selected-work-heading">${esc(home.workHeading)}</h2>
      <div class="work-intro">${home.workIntro.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    </div>
    <ul class="tiles" role="list">
${tiles}
    </ul>
  </div>
</section>`;
  },

  case(d) {
    const tint = tintFor[d.slug] ?? "neutral";
    const facts = [
      ...d.fields.map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${esc(v)}</dd></div>`),
      d.metric ? `<div class="fact fact-metric"><dt>${esc(d.metric.label)}</dt><dd>${esc(d.metric.value)}</dd></div>` : "",
    ].join("");
    return `<header class="case-head">
  <div class="wrap">
    <div class="head-panel tint-${tint}">
      <p class="back-row"><a class="back" href="${d.back.href}"><span aria-hidden="true">← </span>${esc(d.back.label)}</a></p>
      ${d.inProgress ? wipNotice() : ""}
      ${d.tags.length ? `<ul class="chips" role="list">${d.tags.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>` : ""}
      <h1 class="case-title">${esc(d.title)}</h1>
      <p class="lede">${esc(d.summary)}</p>
    </div>
    ${facts ? `<dl class="facts">${facts}</dl>` : ""}
  </div>
</header>
<div class="wrap">
  <article class="sheet" aria-label="Project: ${esc(d.title)}">
${d.heroImage ? figure(d.heroImage) : ""}
${d.sections.length ? sectionsHtml(d, {}) : emptyBody}
  </article>
</div>
${projectNav(d.slug)}`;
  },
};

// ─── D · Hybrid ───────────────────────────────────────────────────────────
// A's structure (spec hero, work index, spec table, heading outline, numbered
// figures) set in B's serif on B's green-and-white surfaces. Same markup as
// A; d.css carries the difference.
export const D = {
  ...A,
  id: "d",
  letter: "D",
  name: "Hybrid",
  fonts:
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap",
  headerClass: "board",
  footerClass: "board",
};

export const directions = [A, B, C, D];
