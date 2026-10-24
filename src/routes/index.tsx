import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, SampleReport } from "@/components/site";
import { OrderForm } from "@/components/OrderForm";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صوت العميل | Voice of the Customer — AI Google review reports" },
      { name: "description", content: "اعرف ماذا يقول عملاؤك فعلاً. Turn your café or restaurant's Google reviews into a clear AI report with actions." },
      { property: "og:title", content: "صوت العميل | Voice of the Customer" },
      { property: "og:description", content: "Know what your customers really say — AI reports from your Google reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Page>
      <section className="bg-gradient-hero">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
          <div className="animate-rise space-y-5">
            <span className="inline-block rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">{t.tagline}</span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              <span className="text-gradient-gold">{t.heroTitle}</span>
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.heroSub}</p>
          </div>
          <div className="animate-rise [animation-delay:150ms]"><OrderForm /></div>
        </div>
      </section>

      <Section title={t.howTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {t.steps.map(([title, body], i) => (
            <div key={title} className="card-surface p-6 transition hover:-translate-y-1">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold font-black text-primary-foreground">{i + 1}</div>
              <h3 className="mb-2 font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.sampleTitle} sub={t.sampleSub}>
        <div className="animate-float"><SampleReport /></div>
      </Section>

      <Section title={t.insideTitle}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.inside.map((i) => (
            <li key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
              <span className="text-primary">✦</span>{i}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.pricingTitle}>
        <div className="mx-auto max-w-sm card-surface border-primary/40 p-8 text-center shadow-gold">
          <div className="text-sm font-semibold text-primary">{t.plan}</div>
          <div className="my-4 flex items-baseline justify-center gap-2">
            <span className="text-6xl font-black">{t.price}</span>
            <span className="text-lg text-muted-foreground">{t.currency}</span>
          </div>
          <div className="mb-6 text-sm text-muted-foreground">{t.per}</div>
          <ul className="mb-8 space-y-2 text-start text-sm">
            {t.planFeatures.map((p) => <li key={p} className="flex gap-2"><span className="text-success">✓</span>{p}</li>)}
          </ul>
          <a href="#order" className="block rounded-xl bg-gradient-gold py-3 font-bold text-primary-foreground">{t.cta}</a>
        </div>
      </Section>

      <Section title={t.faqTitle}>
        <div className="mx-auto max-w-3xl space-y-3">
          {t.faq.map(([q, a], i) => (
            <div key={q} className="rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-start font-semibold">
                {q}<span className="text-primary">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="animate-rise px-5 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center text-3xl font-black">{title}</h2>
      {sub && <p className="mt-2 text-center text-muted-foreground">{sub}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
