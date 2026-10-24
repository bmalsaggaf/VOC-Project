export type Report = {
  score: number;
  praised: string[];
  complaints: string[];
  actions: string[];
};

// Set VITE_REPORT_API_URL (e.g. https://your-n8n/webhook/report) to fetch `${url}?id=...`.
// Return null while the report isn't ready; the page keeps polling.
export async function fetchReport(id: string): Promise<Report | null> {
  const base = import.meta.env.VITE_REPORT_API_URL as string | undefined;
  if (!base) return null;
  const res = await fetch(`${base}?id=${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json && typeof json.score === "number" ? (json as Report) : null;
}
