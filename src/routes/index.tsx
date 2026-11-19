import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Page, SampleReport } from "@/components/site";
import { OrderForm } from "@/components/OrderForm";
import { dict, useLang } from "@/lib/i18n";

// FAQ structured data lets Google show the answers directly in search results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dict.ar.faq.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "صوت العميل | Voice of the Customer",
  serviceType: "تحليل تقييمات قوقل ماب",
  description: dict.ar.heroSub,
  areaServed: ["SA", "AE", "KW", "QA", "BH", "OM"],
  offers: { "@type": "Offer", price: dict.ar.price, priceCurrency: "SAR" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تحليل تقييمات قوقل ماب للمقاهي والمطاعم | صوت العميل" },
      {
        name: "description",
        content:
          "الصق رابط مقهاك أو مطعمك في قوقل ماب، واستلم تقريراً بالذكاء الاصطناعي: ما يحبه عملاؤك، وما يزعجهم، وما تصلحه أولاً. AI reports from your Google Maps reviews.",
      },
      { property: "og:title", content: "اسمع ما يقوله عملاؤك في قوقل ماب | صوت العميل" },
      {
        property: "og:description",
        content:
          "تقرير واضح من تقييمات قوقل ماب لمقهاك أو مطعمك: ما يحبونه، وما يزعجهم، وما تصلحه أولاً.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "اسمع ما يقوله عملاؤك في قوقل ماب | صوت العميل" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd) },
    ],
  }),
  component: Index,
});

// Slight tilts and offsets give the bubbles a hand-placed feel.
const bubbleStyle = [
  { r: "-2deg", delay: "100ms", corner: "rounded-es-md", offset: "" },
  { r: "1.5deg", delay: "250ms", corner: "rounded-ee-md", offset: "sm:ms-10" },
  { r: "-1deg", delay: "400ms", corner: "rounded-es-md", offset: "" },
  { r: "2deg", delay: "550ms", corner: "rounded-ee-md", offset: "sm:ms-6" },
];

function Index() {
  const { t, lang } = useLang();
  const num = (n: number) => n.toLocaleString(lang === "ar" ? "ar-SA" : "en-US");
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Page>
      {/* Hero: blue ground, the headline, the order form, and customers' voices as speech bubbles */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <h1 className="font-display text-[44px] leading-[1.2] sm:text-6xl lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-primary-soft sm:text-xl">
              {t.heroSub}
            </p>
            <div className="mt-8 max-w-xl">
              <OrderForm />
            </div>
          </div>

          <div
            role="group"
            aria-label={t.bubblesLabel}
            className="flex flex-col items-start gap-4 lg:pt-6"
          >
            {t.bubbles.map((b, i) => {
              const st = bubbleStyle[i % bubbleStyle.length]!;
              return (
                <p
                  key={b}
                  className={`animate-pop m-0 rounded-[28px] ${st.corner} ${st.offset} bg-primary-foreground px-6 py-4 text-lg font-medium text-foreground`}
                  style={
                    {
                      "--r": st.r,
                      animationDelay: st.delay,
                      transform: `rotate(${st.r})`,
                    } as CSSProperties
                  }
                >
                  {b}
                </p>
              );
            })}
            <div
              className="animate-pop mt-2 w-full max-w-xl rounded-[32px] rounded-es-lg bg-highlight px-7 py-6 text-highlight-foreground"
              style={
                {
                  "--r": "-1.5deg",
                  animationDelay: "850ms",
                  transform: "rotate(-1.5deg)",
                } as CSSProperties
              }
            >
              <p className="m-0 font-display text-2xl leading-snug">{t.summaryTitle}</p>
              <p className="m-0 mt-1 text-lg font-medium">{t.summaryBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works: a real sequence, so numbered */}
      <Section title={t.howTitle}>
        <ol className="grid gap-5 md:grid-cols-3">
          {t.steps.map(([title, body], i) => {
            const last = i === t.steps.length - 1;
            return (
              <li
                key={title}
                className={`rounded-3xl p-7 ${last ? "bg-foreground text-primary-foreground" : "bg-secondary"}`}
              >
                <span
                  aria-hidden="true"
                  className={`font-display text-6xl leading-none ${last ? "text-highlight" : "text-primary"}`}
                >
                  {num(i + 1)}
                </span>
                <h3 className="mb-1.5 mt-4 text-xl font-semibold">{title}</h3>
                <p className={last ? "text-primary-soft" : "text-muted-foreground"}>{body}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Sample report beside what's inside it */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {t.sampleTitle}
            </h2>
            <p className="mt-3 max-w-[28em] text-lg text-muted-foreground">{t.sampleSub}</p>
            <h3 className="mb-4 mt-10 text-xl font-semibold">{t.insideTitle}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {t.inside.map((item) => (
                <li key={item} className="rounded-full bg-background px-5 py-2.5 font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <SampleReport />
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-10 rounded-[36px] bg-foreground p-8 text-primary-foreground sm:p-12 md:grid-cols-2 md:items-center lg:p-16">
          <div>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {t.pricingTitle}
            </h2>
            <p className="mt-2 text-lg font-semibold">{t.plan}</p>
            <ul className="mt-5 space-y-2 text-lg text-primary-soft">
              {t.planFeatures.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-highlight" aria-hidden="true">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p className="m-0 flex items-baseline gap-3 font-display leading-none text-highlight">
              <span className="text-8xl">{t.price}</span>
              <span className="text-3xl text-primary-foreground">{t.currency}</span>
            </p>
            <p className="m-0 text-primary-soft">{t.per}</p>
            <a
              href="#order"
              className="inline-flex min-h-14 items-center rounded-full bg-highlight px-9 text-lg font-semibold text-highlight-foreground transition hover:bg-primary-foreground"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 md:pb-28">
        <h2 className="mb-7 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {t.faqTitle}
        </h2>
        <div className="space-y-3">
          {t.faq.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="rounded-[22px] bg-secondary">
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-start text-lg font-semibold"
                  >
                    {q}
                    <span className="font-display text-2xl text-primary" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <p
                  id={`faq-${i}`}
                  hidden={!isOpen}
                  className="animate-rise m-0 px-6 pb-5 text-muted-foreground"
                >
                  {a}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </Page>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <h2 className="mb-10 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {children}
    </section>
  );
}
