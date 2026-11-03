// Content and markup shared by the three directions. Text comes straight from
// the portfolio repo (lib/selected-work.ts, lib/projects.ts) so the preview
// never drifts from the live copy.
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const ROOT = process.argv[2] ?? fileURLToPath(new URL("..", import.meta.url));

process.env.NODE_ENV = "production"; // drafts are left out, as on the live site

const load = (p) => import(pathToFileURL(path.join(ROOT, p)).href);
export const { selectedWork, topLevelWork } = await load("lib/selected-work.ts");
export const { projects } = await load("lib/projects.ts");
export const { primitives } = await load("lib/design-tokens.ts");
export { ROOT };

// app/portfolio/page.tsx, verbatim.
export const home = {
  eyebrow: "UX Principal · Design Systems · Accessibility",
  h1a: "Design that scales.",
  h1b: "For everyone.",
  intro:
    "I've spent 20+ years in design, most recently leading design systems and accessibility across 40 enterprise products. Here's what I can do for your team:",
  offers: [
    "Build a design system that product teams adopt, and run it as it grows.",
    "Make accessibility part of every team's everyday work, with the process, tools, and training to keep it there.",
    "Set up AI prototyping that follows your design system and hands engineers code they can reuse.",
    "Lead and grow designers, and tie design decisions to what leadership cares about.",
  ],
  // Short labels for the offers, used by directions A and C as cell headings.
  offerLabels: ["Design systems", "Accessibility", "AI prototyping", "Leadership"],
  cta: "Get in touch",
  wip: "This portfolio is a work in progress. I'm adding case studies and screenshots as I finish them.",
  workHeading: "Selected work",
  workIntro: [
    "I design systems, tools, and product experiences that make complex software easier to use and more accessible. My recent work spans accessibility infrastructure, design systems, inclusive research, and AI-assisted experiences.",
    "I find the problem, understand the users and workflow, design the solution, and increasingly build it myself.",
  ],
};

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export const slugify = (t) => t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export function splitTitle(title) {
  const i = title.indexOf(":");
  return i < 0 ? { cat: "", rest: title } : { cat: title.slice(0, i), rest: title.slice(i + 1).trim() };
}

export function shortTitle(title) {
  const { rest } = splitTitle(title);
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

export const caseHref = (slug) => `case-${slug}.html`;
const mapHref = (href) => (href.startsWith("/work/") ? caseHref(href.slice(6)) : href);

// Same rules as components/ProjectNav.tsx and backLink() in app/work/[slug].
export function neighbours(slug) {
  const item = selectedWork.find((w) => w.slug === slug);
  const seq = item?.parent ? selectedWork.filter((w) => w.parent === item.parent) : topLevelWork;
  const i = seq.findIndex((w) => w.slug === slug);
  return {
    prev: i > 0 ? seq[i - 1] : null,
    next: i >= 0 && i < seq.length - 1 ? seq[i + 1] : null,
    parent: selectedWork.find((w) => w.slug === item?.parent) ?? null,
  };
}

export function caseData(item) {
  const p = projects.find((x) => x.slug === item.slug);
  const parent = selectedWork.find((w) => w.slug === item.parent);
  return {
    item,
    slug: item.slug,
    title: p?.title ?? item.title,
    summary: p?.summary ?? item.description,
    tags: p?.tags ?? [],
    fields: p ? [["Client", p.client], ["Year", p.year], ["Role", p.role]].filter(([, v]) => v) : [],
    metric: p?.heroMetric,
    heroImage: p?.heroImage,
    sections: p?.sections ?? [],
    inProgress: item.inProgress,
    back: parent
      ? { href: caseHref(parent.slug), label: `Back to ${splitTitle(parent.title).cat}` }
      : { href: "home.html", label: "Back to work" },
  };
}

// Which drawn tile each case study gets. The AI prototyping study has no
// tile on the live site; "code" is a new drawing for this preview.
export const illoKind = (item) => item.thumbnail ?? (item.slug === "ai-prototyping" ? "code" : "title");

// Decorative drawings echoing components/WorkCard.tsx. Colors come from CSS
// classes, so each direction restyles the same shapes.
export function illo(item) {
  const kind = illoKind(item);
  let inner = "";
  if (kind === "products") {
    inner = Array.from({ length: 40 }, (_, i) => {
      const c = i % 8, r = Math.floor(i / 8);
      return `<rect x="${12 + c * 17.5}" y="${14 + r * 19}" width="13" height="14" rx="2" class="il-accent"/>`;
    }).join("");
  } else if (kind === "swatches") {
    inner = primitives
      .map((p, i) => {
        const c = i % 4, r = Math.floor(i / 4);
        return `<rect x="${14 + c * 34}" y="${14 + r * 32}" width="30" height="28" rx="3" fill="${p.hex}" class="il-swatch"/>`;
      })
      .join("");
  } else if (kind === "schedule") {
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        inner += `<rect x="${14 + col * 17}" y="${30 + row * 21}" width="14" height="18" rx="2" class="${row === 1 && col === 1 ? "il-accent" : "il-soft"}"/>`;
    inner += `<path d="M70 60 h14 m-4 -4 l4 4 l-4 4" class="il-line"/>
      <rect x="96" y="28" width="44" height="6" rx="1" class="il-fill"/>
      <rect x="100" y="42" width="34" height="5" rx="1" class="il-accent"/>
      <circle cx="106" cy="58" r="1.5" class="il-fill"/><rect x="111" y="56" width="30" height="4" rx="1" class="il-soft"/>
      <circle cx="106" cy="68" r="1.5" class="il-fill"/><rect x="111" y="66" width="30" height="4" rx="1" class="il-soft"/>
      <rect x="100" y="80" width="34" height="5" rx="1" class="il-accent"/>
      <circle cx="106" cy="96" r="1.5" class="il-fill"/><rect x="111" y="94" width="26" height="4" rx="1" class="il-soft"/>`;
  } else if (kind === "messages") {
    inner = `<rect x="16" y="20" width="96" height="44" rx="10" class="il-card"/>
      <rect x="28" y="30" width="72" height="4" rx="1" class="il-soft"/>
      <rect x="28" y="40" width="72" height="4" rx="1" class="il-soft"/>
      <rect x="28" y="50" width="44" height="4" rx="1" class="il-soft"/>
      <rect x="84" y="74" width="60" height="26" rx="10" class="il-accent"/>
      <text x="114" y="91" text-anchor="middle" font-size="10" class="il-label">ACCEPT</text>`;
  } else if (kind === "code") {
    // A prototype's code, one line checked against a rule, and the note that
    // records an exception for engineers.
    inner = `<rect x="12" y="14" width="104" height="80" rx="6" class="il-card"/>
      <path d="M12 28 h104" class="il-line"/>
      <circle cx="21" cy="21" r="2" class="il-soft"/><circle cx="29" cy="21" r="2" class="il-soft"/><circle cx="37" cy="21" r="2" class="il-soft"/>
      <rect x="22" y="38" width="40" height="4" rx="1" class="il-soft"/>
      <rect x="30" y="48" width="58" height="4" rx="1" class="il-accent"/>
      <path d="M94 50 l3 3 l6 -6" class="il-line"/>
      <rect x="30" y="58" width="46" height="4" rx="1" class="il-soft"/>
      <rect x="22" y="68" width="30" height="4" rx="1" class="il-soft"/>
      <rect x="84" y="66" width="62" height="40" rx="6" class="il-accent"/>
      <rect x="92" y="76" width="44" height="4" rx="1" class="il-on-accent"/>
      <rect x="92" y="86" width="32" height="4" rx="1" class="il-on-accent"/>`;
  } else {
    inner = `<text x="12" y="104" font-size="12" class="il-fill-text">${esc(splitTitle(item.title).cat)}</text>`;
  }
  return `<svg viewBox="0 0 160 120" class="illo" aria-hidden="true" focusable="false">${inner}</svg>`;
}

const imgHref = (src) => (src.startsWith("/") ? `..${src}` : src);
export const imagesUsed = new Set();

// One figure. `label` lets a direction number its figures.
export function figure(b, label = "") {
  if (!b.src) {
    return `<figure class="b-figure"><div class="b-placeholder" role="img" aria-label="Image placeholder: ${esc(b.alt)}"><p>${esc(b.alt)}</p></div>${
      b.caption ? `<figcaption>${label}${esc(b.caption)}</figcaption>` : ""
    }</figure>`;
  }
  imagesUsed.add(b.src);
  const href = imgHref(b.src);
  const size = b.width && b.height ? ` width="${b.width}" height="${b.height}"` : "";
  return `<figure class="b-figure">
  <img src="${href}" alt="${esc(b.alt)}"${size} loading="lazy">
  ${b.caption ? `<figcaption>${label}${esc(b.caption)}</figcaption>` : ""}
  <p class="b-fullsize"><a href="${href}">View full-size image<span class="sr-only">: ${esc(b.caption ?? b.alt)}</span></a></p>
</figure>`;
}

// Renders a case study's blocks with neutral class names; each direction's
// stylesheet gives them their look.
export function blocks(list, { figLabel = () => "", counter = { n: 0 } } = {}) {
  return list
    .map((b) => {
      switch (b.type) {
        case "paragraph":
          return `<p class="b-p">${esc(b.text)}</p>`;
        case "list":
          return `<ul class="b-list">${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
        case "callout":
          return `<blockquote class="b-quote"><p>${esc(b.text)}</p></blockquote>`;
        case "metrics":
          return `<ul class="b-metrics" role="list">${b.items
            .map(
              (m) =>
                `<li><p class="m-value">${esc(m.value)}</p><p class="m-label">${esc(m.label)}</p>${
                  m.note ? `<p class="m-note">${esc(m.note)}</p>` : ""
                }</li>`,
            )
            .join("")}</ul>`;
        case "stages":
          return `<ol class="b-stages" role="list">${b.items
            .map(
              (s, i) => `<li><span class="s-num" aria-hidden="true">${i + 1}</span><div class="s-body">${
                s.when ? `<p class="s-when">${esc(s.when)}</p>` : ""
              }<h3><span class="sr-only">Stage ${i + 1}: </span>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`,
            )
            .join("")}</ol>`;
        case "links":
          return `<ul class="b-links" role="list">${b.items
            .map(
              (l) => `<li class="b-link-card">${l.eyebrow ? `<p class="b-eyebrow">${esc(l.eyebrow)}</p>` : ""}<h3><a href="${mapHref(
                l.href,
              )}">${esc(l.title)}</a></h3><p>${esc(l.text)}</p></li>`,
            )
            .join("")}</ul>`;
        case "figure":
          return `<p class="b-placeholder b-figure-note">The interactive “${esc(
            b.name.replace(/-/g, " "),
          )}” figure from the live case study isn't reproduced in this preview.</p>`;
        case "image":
          return figure(b, figLabel(++counter.n));
        default:
          return "";
      }
    })
    .join("\n");
}

export const navLinks = [
  { href: "home.html", label: "Work", key: "work" },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

export function siteHeader(current, extraClass = "") {
  return `<header class="site-header ${extraClass}">
  <nav class="wrap site-nav" aria-label="Main navigation">
    <a class="brand" href="home.html">Melissa Garland</a>
    <ul class="nav-links" role="list">${navLinks
      .map(
        (l) =>
          `<li><a href="${l.href}"${l.key === current ? ' aria-current="page"' : ""}>${l.label}</a></li>`,
      )
      .join("")}</ul>
  </nav>
</header>`;
}

export function siteFooter(extraClass = "") {
  return `<footer class="site-footer ${extraClass}">
  <div class="wrap footer-inner">
    <p class="footer-name">Melissa Garland</p>
    <ul class="footer-links" role="list">
      <li><a href="contact.html">Get in touch</a></li>
      <li><a href="privacy.html">Privacy</a></li>
      <li><a href="https://www.linkedin.com/in/magarland/" rel="me">LinkedIn</a></li>
    </ul>
    <p class="footer-tag">UX Principal · Design Systems · Accessibility</p>
  </div>
</footer>`;
}

export function projectNav(slug, cls = "") {
  const { prev, next, parent } = neighbours(slug);
  if (!prev && !next && !parent) return "";
  const link = (w, dir) =>
    `<a class="pn-link pn-${dir}" href="${caseHref(w.slug)}"><span class="pn-dir">${
      dir === "prev"
        ? `<span aria-hidden="true">← </span>Previous<span class="sr-only"> project:</span>`
        : `Next<span class="sr-only"> project:</span><span aria-hidden="true"> →</span>`
    }</span> <span class="pn-title">${esc(shortTitle(w.title))}</span></a>`;
  return `<nav class="project-nav ${cls}" aria-label="Project navigation"><div class="wrap">
  ${parent ? `<p class="pn-parent">Appendix to <a href="${caseHref(parent.slug)}">${esc(splitTitle(parent.title).cat)}</a></p>` : ""}
  <div class="pn-row">${prev ? link(prev, "prev") : "<span></span>"}${next ? link(next, "next") : ""}</div>
</div></nav>`;
}

export function wipNotice() {
  return `<p class="notice"><strong>Work in progress.</strong> This case study is still being written.</p>`;
}

// The "in progress" marker: always text, with a half-filled circle as a
// second cue.
export const progressIcon = `<svg class="i-progress" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.5 a6.5 6.5 0 0 1 0 13 z" fill="currentColor"/></svg>`;

export function pageShell({ dir, title, current, body, headerClass = "", footerClass = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Melissa Garland · Direction ${dir.letter} preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${dir.fonts}">
<link rel="stylesheet" href="style.css">
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<aside class="preview-flag" aria-label="Preview notice"><p>Design preview: Direction ${dir.letter}, ${esc(dir.name)}. Not the live site.</p></aside>
${siteHeader(current, headerClass)}
<main id="main">
${body}
</main>
${siteFooter(footerClass)}
</body>
</html>
`;
}

export function stubBody(name) {
  return `<div class="wrap stub"><h1>${esc(name)}</h1><p>The ${esc(
    name,
  )} page isn't part of this preview. The preview covers the home page, Selected work, and case studies.</p><p><a href="home.html">Go to the home page</a></p></div>`;
}
