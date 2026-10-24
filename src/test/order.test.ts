import { describe, it, expect } from "vitest";
import { validateOrder } from "@/lib/order";

describe("order validation", () => {
  it("accepts google.com/maps and maps.app.goo.gl links", () => {
    expect(validateOrder({ mapsUrl: "https://www.google.com/maps/place/x", email: "a@b.co", reportLanguage: "ar" })).toEqual({});
    expect(validateOrder({ mapsUrl: "https://maps.app.goo.gl/abc", email: "a@b.co", reportLanguage: "en" })).toEqual({});
  });
  it("rejects non-maps links", () => {
    expect(validateOrder({ mapsUrl: "https://example.com", email: "a@b.co", reportLanguage: "ar" }).mapsUrl).toBe("link");
  });
  it("requires email and report language", () => {
    const e = validateOrder({ mapsUrl: "https://maps.app.goo.gl/abc", email: "bad" });
    expect(e.email).toBe("email");
    expect(e.reportLanguage).toBe("lang");
  });
});
