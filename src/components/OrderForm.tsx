import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useLang } from "@/lib/i18n";
import { validateOrder, type OrderErrors, type OrderInput } from "@/lib/order";
import { submitOrder } from "@/lib/order.functions";

export function OrderForm() {
  const { t, lang } = useLang();
  const f = t.form;
  const navigate = useNavigate();
  const send = useServerFn(submitOrder);
  const [mapsUrl, setMapsUrl] = useState("");
  const [email, setEmail] = useState("");
  const [reportLanguage, setReportLanguage] = useState<"" | "ar" | "en">("");
  const [errors, setErrors] = useState<OrderErrors>({});
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const msg = { link: f.errLink, email: f.errEmail, lang: f.errLang };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(false);
    const input = { mapsUrl, email, reportLanguage } as OrderInput;
    const errs = validateOrder(input);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const { orderId } = await send({ data: input });
      navigate({ to: "/pay", search: { id: orderId } });
    } catch (err) {
      console.error(err);
      setServerError(true);
      setLoading(false);
    }
  }

  const field = "w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <form id="order" onSubmit={onSubmit} noValidate className="card-surface space-y-4 p-5 sm:p-6">
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">{f.link}</span>
        <input dir="ltr" className={field} placeholder={f.linkPh} value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} />
        {errors.mapsUrl && <span className="text-xs text-destructive">{msg[errors.mapsUrl]}</span>}
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">{f.email}</span>
        <input dir="ltr" type="email" className={field} placeholder={f.emailPh} value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="text-xs text-destructive">{msg[errors.email]}</span>}
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">{f.lang}</span>
        <select className={field} value={reportLanguage} onChange={(e) => setReportLanguage(e.target.value as "ar" | "en")}>
          <option value="" disabled>—</option>
          <option value="ar">{f.ar}</option>
          <option value="en">{f.en}</option>
        </select>
        {errors.reportLanguage && <span className="text-xs text-destructive">{msg[errors.reportLanguage]}</span>}
      </label>
      {serverError && <div className="rounded-xl bg-destructive/15 p-3 text-sm text-destructive">{f.errServer}</div>}
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold py-3.5 font-bold text-primary-foreground shadow-gold transition hover:brightness-110 disabled:opacity-70">
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />}
        {loading ? f.loading : f.submit}
      </button>
      <p className="text-center text-xs text-muted-foreground" key={lang}>{f.note}</p>
    </form>
  );
}
