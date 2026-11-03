// Shared by the build (to print contrast tables) and by the contrast check.
export const palettes = {
  a: {
    paper: "#FFFFFF", ink: "#15171C", ink2: "#4B5160", panel: "#F4F5F7",
    rule: "#D5D8DE", ruleStrong: "#737985", mark: "#9E1459", markWash: "#FCEEF5", guide: "#F0F1F4",
  },
  b: {
    board: "#1D3B33", chalk: "#F5F7F4", chalk2: "#C5D3CC", highlight: "#F3CD55",
    page: "#FFFFFF", ink: "#18221F", ink2: "#48574F", link: "#1C5E4B",
    wash: "#EDF2EF", rule: "#CBD5D0", ruleStrong: "#6F7F78",
  },
  d: {
    board: "#1D3B33", chalk: "#F5F7F4", chalk2: "#C5D3CC", highlight: "#F3CD55",
    boardGuide: "#2A4A41", boardRule: "#7E978B",
    page: "#FFFFFF", ink: "#18221F", ink2: "#48574F", link: "#1C5E4B",
    wash: "#EDF2EF", rule: "#CBD5D0", ruleStrong: "#6F7F78",
  },
  c: {
    bg: "#F6F7FB", surface: "#FFFFFF", ink: "#1B1F2A", ink2: "#4D5466",
    primary: "#1162EE", primary100: "#E8F0FD", border: "#7F8597",
    blue100: "#E8F0FD", blue900: "#0B3B8F",
    green100: "#E4F7DE", green900: "#1A5310",
    amber100: "#FFF0D1", amber900: "#6B4100",
    violet100: "#EFE9FD", violet900: "#4B2A9A",
    neutral100: "#EEF0F4",
  },
};

// [direction, fg, bg, required ratio, where it's used]
export const pairs = [
  ["a", "ink", "paper", 4.5, "Body and headings"],
  ["a", "ink2", "paper", 4.5, "Secondary text, captions"],
  ["a", "ink2", "panel", 4.5, "Secondary text on spec panel / row hover"],
  ["a", "ink", "panel", 4.5, "Body text on spec panel"],
  ["a", "mark", "paper", 4.5, "Links, annotation labels"],
  ["a", "mark", "panel", 4.5, "Links on spec panel / row hover"],
  ["a", "mark", "markWash", 4.5, "Category and status chips"],
  ["a", "paper", "ink", 4.5, "Primary button label"],
  ["a", "ink2", "guide", 4.5, "Secondary text over hero column guides"],
  ["a", "mark", "guide", 4.5, "Magenta headline words over column guides"],
  ["a", "ruleStrong", "paper", 3, "Chip and frame borders"],
  ["a", "mark", "paper", 3, "Focus outline on page"],
  ["a", "mark", "panel", 3, "Focus outline on panel"],
  ["b", "chalk", "board", 4.5, "Hero and footer text on board"],
  ["b", "chalk2", "board", 4.5, "Secondary text on board"],
  ["b", "highlight", "board", 4.5, "Highlighted words, links on board"],
  ["b", "board", "highlight", 4.5, "Button label on highlight"],
  ["b", "ink", "page", 4.5, "Body and headings"],
  ["b", "ink2", "page", 4.5, "Captions, bylines"],
  ["b", "ink2", "wash", 4.5, "Captions on figure wash"],
  ["b", "ink", "wash", 4.5, "Text on tinted band"],
  ["b", "link", "page", 4.5, "Links"],
  ["b", "link", "wash", 4.5, "Links on tinted band"],
  ["b", "ruleStrong", "page", 3, "Control borders"],
  ["b", "link", "page", 3, "Focus outline on page"],
  ["b", "highlight", "board", 3, "Focus outline on board"],
  ["d", "chalk", "board", 4.5, "Headings and text on green bands"],
  ["d", "chalk2", "board", 4.5, "Secondary text on green"],
  ["d", "highlight", "board", 4.5, "Yellow labels, links and headline words on green"],
  ["d", "board", "highlight", 4.5, "Button label on yellow"],
  ["d", "chalk", "boardGuide", 4.5, "Text over chalk column guides"],
  ["d", "chalk2", "boardGuide", 4.5, "Secondary text over column guides"],
  ["d", "highlight", "boardGuide", 4.5, "Yellow text over column guides"],
  ["d", "boardRule", "board", 3, "Chip and table borders on green"],
  ["d", "highlight", "board", 3, "Focus outline on green"],
  ["d", "ink", "page", 4.5, "Body text"],
  ["d", "ink2", "page", 4.5, "Secondary text, captions"],
  ["d", "ink", "wash", 4.5, "Text on hovered row"],
  ["d", "ink2", "wash", 4.5, "Secondary text on hovered row"],
  ["d", "link", "page", 4.5, "Links and mono labels"],
  ["d", "link", "wash", 4.5, "Links and badges on wash"],
  ["d", "ruleStrong", "page", 3, "Frame and chip borders"],
  ["d", "link", "page", 3, "Focus outline on white"],
  ["d", "link", "wash", 3, "Focus outline on hovered row"],
  ["c", "ink", "bg", 4.5, "Body on app background"],
  ["c", "ink2", "bg", 4.5, "Secondary text on app background"],
  ["c", "ink2", "surface", 4.5, "Secondary text on cards"],
  ["c", "primary", "surface", 4.5, "Links on cards"],
  ["c", "primary", "bg", 4.5, "Links on app background"],
  ["c", "surface", "primary", 4.5, "Primary button label"],
  ["c", "border", "surface", 3, "Card and chip borders on white"],
  ["c", "border", "bg", 3, "Card borders on app background"],
  ...["blue", "green", "amber", "violet"].flatMap((h) => [
    ["c", "ink", `${h}100`, 4.5, `Body text on ${h} tile`],
    ["c", "ink2", `${h}100`, 4.5, `Secondary text on ${h} tile`],
    ["c", `${h}900`, `${h}100`, 4.5, `${h} chip label`],
    ["c", "primary", `${h}100`, 3, `Focus ring blue band on ${h} tile`],
  ]),
  ["c", "ink2", "neutral100", 4.5, "Secondary text on neutral tile"],
  ["c", "primary", "primary100", 4.5, "Link inside blue info panel"],
  ["c", "primary", "surface", 3, "Focus ring blue band on white"],
  ["c", "primary", "bg", 3, "Focus ring blue band on app background"],
];

function lum(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function ratio(a, b) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
export function checks() {
  return pairs.map(([d, fg, bg, need, use]) => {
    const r = ratio(palettes[d][fg], palettes[d][bg]);
    return { d, fg, bg, fgHex: palettes[d][fg], bgHex: palettes[d][bg], need, use, r, pass: r >= need };
  });
}
