/**
 * A curated palette for subscription avatars.
 * 12 colors covering the hue wheel evenly — one per hue family, no duplicates.
 * Each color is paired: `bg` for the avatar background, `fg` for the letter.
 * All pairs hit 4.5:1+ contrast for accessibility.
 */
const LOGO_PALETTE = [
  { bg: "#E0EAFE", fg: "#1E40AF" }, // blue
  { bg: "#DCFCE7", fg: "#15803D" }, // green
  { bg: "#FEE2E2", fg: "#B91C1C" }, // coral
  { bg: "#EDE9FE", fg: "#6D28D9" }, // purple
  { bg: "#CCFBF1", fg: "#0F766E" }, // teal
  { bg: "#FEF3C7", fg: "#A16207" }, // sand
  { bg: "#FCE7F3", fg: "#BE185D" }, // rose
  { bg: "#E7F0E0", fg: "#4D7C0F" }, // sage
  { bg: "#FFEDD5", fg: "#9A3412" }, // amber
  { bg: "#F3E8FF", fg: "#7E22CE" }, // lavender
  { bg: "#D1FAE5", fg: "#047857" }, // mint
  { bg: "#FFE4E6", fg: "#9F1239" }, // dusty rose
] as const;

export type LogoColor = (typeof LOGO_PALETTE)[number];

/**
 * Deterministically picks a color from the palette based on the name.
 * Same input always produces the same output.
 *
 * Uses FNV-1a (32-bit) instead of DJB2 — FNV has better avalanche behavior
 * on short strings, so similar inputs produce very different hashes.
 */
export function getLogoColor(name: string): LogoColor {
  const normalized = name.trim().toLowerCase();

  // FNV-1a offset basis (32-bit)
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    // Multiply by FNV prime (32-bit). Math.imul handles 32-bit integer overflow.
    hash = Math.imul(hash, 16777619);
  }

  // Coerce to unsigned 32-bit so modulo gives a positive index.
  const unsigned = hash >>> 0;
  const index = unsigned % LOGO_PALETTE.length;
  return LOGO_PALETTE[index];
}

/**
 * Returns the first visible character of the name, uppercased.
 * Uses Array.from to handle multi-byte chars (emojis) correctly.
 */
export function getLogoInitial(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return "?";
  return Array.from(trimmed)[0].toUpperCase();
}