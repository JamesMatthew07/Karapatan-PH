export const locales = ["fil", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fil";

export function isValidLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
