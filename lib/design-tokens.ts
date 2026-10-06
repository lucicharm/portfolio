// A slice of the PowerSchool design system's color tokens, used by the
// figures in the design system case study.

export type Primitive = { id: string; hex: string };
// A semantic token usually points at one primitive. The focus ring is built
// from three.
export type Semantic = { id: string; from: string[] };
export type TokenComponent = { id: string; uses: string[] };
export type ContrastCheck = {
  fg: string;
  bg: string;
  // 4.5 for text, 3 for icons and other non-text graphics.
  need: 4.5 | 3;
  use: string;
};

export const primitives: Primitive[] = [
  { id: "navy-500", hex: "#1162EE" },
  { id: "navy-100", hex: "#E8F0FD" },
  { id: "white", hex: "#FFFFFF" },
  { id: "gray-800", hex: "#222222" },
  { id: "gray-600", hex: "#4D5557" },
  { id: "green-500", hex: "#218900" },
  { id: "green-600", hex: "#1A6600" },
  { id: "green-100", hex: "#E4F7DE" },
  { id: "red-500", hex: "#E21707" },
  { id: "red-600", hex: "#BA100C" },
  { id: "red-100", hex: "#FBDDDA" },
];

export const semantics: Semantic[] = [
  { id: "link-text", from: ["navy-500"] },
  { id: "button-primary", from: ["navy-500"] },
  { id: "info-dark", from: ["navy-500"] },
  { id: "button-secondary-hover", from: ["navy-100"] },
  { id: "info-light", from: ["navy-100"] },
  { id: "focus-ring", from: ["navy-500", "navy-100", "white"] },
  { id: "global-background", from: ["white"] },
  { id: "global-white", from: ["white"] },
  { id: "dark-text", from: ["gray-800"] },
  { id: "text-light", from: ["gray-600"] },
  { id: "icon-light", from: ["gray-600"] },
  { id: "success-text", from: ["green-500"] },
  { id: "success-dark", from: ["green-600"] },
  { id: "success-light", from: ["green-100"] },
  { id: "error-text", from: ["red-500"] },
  { id: "button-destructive", from: ["red-500"] },
  { id: "error-dark", from: ["red-600"] },
  { id: "error-light", from: ["red-100"] },
];

export const tokenComponents: TokenComponent[] = [
  { id: "Link", uses: ["link-text"] },
  { id: "Primary button", uses: ["button-primary", "global-white"] },
  { id: "Info message", uses: ["info-dark", "info-light"] },
  { id: "Secondary button hover", uses: ["button-secondary-hover"] },
  { id: "Selected item", uses: ["info-light"] },
  { id: "Focus indicator", uses: ["focus-ring"] },
  { id: "Page and card", uses: ["global-background"] },
  { id: "Body text", uses: ["dark-text"] },
  { id: "Secondary text and icon", uses: ["text-light", "icon-light"] },
  // Messages: a 500-level icon (the *-text tokens) and 600-level text (the
  // *-dark tokens) on a 100-level background (the *-light tokens).
  { id: "Success message", uses: ["success-text", "success-dark", "success-light"] },
  { id: "Error message", uses: ["error-text", "error-dark", "error-light"] },
  { id: "Destructive button", uses: ["button-destructive", "global-white"] },
];

export const contrastChecks: ContrastCheck[] = [
  { fg: "dark-text", bg: "global-background", need: 4.5, use: "Body text" },
  { fg: "text-light", bg: "global-background", need: 4.5, use: "Light text" },
  { fg: "text-light", bg: "info-light", need: 4.5, use: "Light text on a 100-level color" },
  { fg: "link-text", bg: "global-background", need: 4.5, use: "Link text" },
  { fg: "link-text", bg: "info-light", need: 4.5, use: "Link inside an info message" },
  { fg: "global-white", bg: "button-primary", need: 4.5, use: "Primary button label" },
  { fg: "global-white", bg: "button-destructive", need: 4.5, use: "Destructive button label" },
  { fg: "dark-text", bg: "info-light", need: 4.5, use: "Text on a selected item" },
  { fg: "icon-light", bg: "global-background", need: 3, use: "Light icon" },
  { fg: "success-dark", bg: "success-light", need: 4.5, use: "Success message text" },
  { fg: "error-dark", bg: "error-light", need: 4.5, use: "Error message text" },
  { fg: "info-dark", bg: "info-light", need: 3, use: "Info icon on its message" },
  { fg: "success-text", bg: "success-light", need: 3, use: "Success icon on its message" },
  { fg: "error-text", bg: "error-light", need: 3, use: "Error icon on its message" },
];

// The focus ring's bands, from the inside out.
export const focusRingBands = ["white", "navy-500", "navy-100"];

export function primitiveHex(id: string): string {
  const primitive = primitives.find((p) => p.id === id);
  if (!primitive) throw new Error(`Unknown primitive: ${id}`);
  return primitive.hex;
}

// The primitive behind a single-color semantic token.
export function semanticHex(id: string): string {
  const semantic = semantics.find((s) => s.id === id);
  if (!semantic) throw new Error(`Unknown semantic token: ${id}`);
  return primitiveHex(semantic.from[0]);
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG contrast ratio between two colors.
export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}
