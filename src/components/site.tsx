import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import type { ReactNode } from "react";

/** Speech bubble with three dots: the customer's voice. Text-based mark, no image files. */
function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <rect x="3" y="4" width="30" height="22" rx="11" fill="var(--highlight)" />
      <path d="M9 26l-3 7 9-7z" fill="var(--highlight)" />
      <circle cx="12" cy="15" r="2.2" fill="var(--foreground)" />
      <circle cx="18" cy="15" r="2.2" fill="var(--foreground)" />
      <circle cx="24" cy="15" r="2.2" fill="var(--foreground)" />
    </svg>
  );
}

export function Logo() {
  const { t } = useLang();
  return (
    <Link to="/" className="flex items-center gap-2.5 text-primary-foreground">
      <LogoMark />
      <span className="font-display text-2xl leading-none sm:text-[28px]">{t.brand}</span>
    </Link>
  );
}

export function Header() {
  const { t, lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="flex rounded-full bg-primary-foreground/15 p-1 text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            {(["ar", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`min-h-9 rounded-full px-3 transition ${lang === l ? "bg-primary-foreground text-primary" : "text-primary-foreground"}`}
              >
                {l === "ar" ? "عربي" : "EN"}
              </button>
            ))}
          </div>
          <a
            href="/#order"
            className="hidden min-h-11 items-center rounded-full bg-highlight px-5 text-sm font-semibold text-highlight-foreground sm:inline-flex"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-primary text-primary-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <div className="font-display text-3xl leading-tight text-primary-foreground">
            {t.brand}
          </div>
          <p>{t.tagline}</p>
          <a
            href="mailto:hello@voiceofcustomer.app"
            className="text-primary-foreground underline-offset-4 hover:underline"
          >
            hello@voiceofcustomer.app
          </a>
        </div>
        <nav className="flex gap-5" aria-label="Footer">
          <Link
            to="/privacy"
            className="text-primary-foreground underline-offset-4 hover:underline"
          >
            {t.footer.privacy}
          </Link>
          <Link to="/terms" className="text-primary-foreground underline-offset-4 hover:underline">
            {t.footer.terms}
          </Link>
        </nav>
        <div>
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SampleReport() {
  const { t } = useLang();
  const s = t.sample;
  return (
    <figure className="card-surface m-0 p-6 sm:p-9" aria-label={t.sampleTitle}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{s.shop}</span>
        <span className="rounded-full bg-highlight/35 px-3 py-0.5 text-foreground">{s.badge}</span>
      </div>

      <div className="mb-7 rounded-3xl bg-secondary p-5">
        <div className="text-sm text-muted-foreground">{s.score}</div>
        <div className="my-1 font-display text-primary">
          <span dir="ltr" className="inline-flex items-baseline gap-1">
            <span className="text-6xl leading-none">82</span>
            <span className="text-2xl">/100</span>
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-primary-foreground">
          <div className="h-full w-[82%] rounded-full bg-primary" />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">1,248 {s.reviews}</div>
      </div>

      <div className="mb-7 grid gap-6 sm:grid-cols-2">
        <List title={s.praised} items={s.praisedList} tone="text-success" mark="+" />
        <List title={s.complaints} items={s.complaintsList} tone="text-destructive" mark="−" />
      </div>

      <div className="rounded-3xl bg-highlight p-5 text-highlight-foreground">
        <div className="mb-2 font-semibold">{s.actions}</div>
        <ol className="space-y-1.5 text-[15px]">
          {s.actionsList.map((a, i) => (
            <li key={a} className="flex gap-3">
              <span className="font-display text-lg leading-6" aria-hidden="true">
                {i + 1}
              </span>
              {a}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function List({
  title,
  items,
  tone,
  mark,
}: {
  title: string;
  items: readonly string[];
  tone: string;
  mark: string;
}) {
  return (
    <div>
      <div className="mb-2 font-semibold">{title}</div>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-[15px]">
            <span className={`w-3 font-bold ${tone}`} aria-hidden="true">
              {mark}
            </span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
