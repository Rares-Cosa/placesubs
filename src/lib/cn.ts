import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes intelligently.
 * - clsx handles conditional classes (truthy/falsy filtering, nested arrays, objects)
 * - twMerge resolves conflicts (e.g. "p-2 p-4" → "p-4")
 *
 * Used in components that accept a className prop, so users of the
 * component can override styles without specificity wars.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}