export type OrderInput = { mapsUrl: string; email: string; reportLanguage: "ar" | "en" };
export type OrderErrors = Partial<Record<keyof OrderInput, "link" | "email" | "lang">>;

export function isMapsUrl(v: string) {
  const s = v.trim().toLowerCase();
  if (s.length > 2000) return false;
  return s.includes("google.com/maps") || s.includes("maps.app.goo.gl");
}

export function isEmail(v: string) {
  return v.trim().length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function validateOrder(input: Partial<OrderInput>): OrderErrors {
  const e: OrderErrors = {};
  if (!input.mapsUrl || !isMapsUrl(input.mapsUrl)) e.mapsUrl = "link";
  if (!input.email || !isEmail(input.email)) e.email = "email";
  if (input.reportLanguage !== "ar" && input.reportLanguage !== "en") e.reportLanguage = "lang";
  return e;
}
