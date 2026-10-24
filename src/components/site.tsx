import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import type { ReactNode } from "react";

export function Logo() {
  const { t } = useLang();
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl rounded-be-sm bg-gradient-gold text-lg text-primary-foreground shadow-gold">
        ★
      </span>
      <span className="text-lg font-bold">{t.brand}</span>
    </Link>
  );
}

export function Header() {
  const { t, lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-border p-0.5 text-xs font-semibold">
            {(["ar", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1.5 transition ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/#order" className="hidden rounded-full bg-gradient-gold px-4 py-2 text-sm font-bold text-primary-foreground shadow-gold sm:inline-block">
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
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-bold text-foreground">{t.brand}</div>
          <a href="mailto:hello@voiceofcustomer.app" className="hover:text-primary">hello@voiceofcustomer.app</a>
        </div>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-primary">{t.footer.privacy}</Link>
          <Link to="/terms" className="hover:text-primary">{t.footer.terms}</Link>
        </div>
        <div>© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</div>
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
    <div className="card-surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <div className="text-xs text-muted-foreground">{t.brand}</div>
          <div className="font-bold">{s.shop}</div>
        </div>
        <span className="text-primary">★★★★☆</span>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-3">
        <div className="rounded-2xl bg-secondary p-5 text-center">
          <div className="text-xs text-muted-foreground">{s.score}</div>
          <div className="text-gradient-gold my-2 text-5xl font-black">82<span className="text-2xl">/100</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[82%] rounded-full bg-gradient-gold" />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">1,248 {s.reviews}</div>
        </div>
        <List title={s.praised} items={s.praisedList} tone="text-success" mark="＋" />
        <List title={s.complaints} items={s.complaintsList} tone="text-destructive" mark="−" />
      </div>
      <div className="border-t border-border p-5">
        <div className="mb-3 text-sm font-bold">{s.actions}</div>
        <ol className="grid gap-2 md:grid-cols-3">
          {s.actionsList.map((a, i) => (
            <li key={a} className="flex gap-3 rounded-xl bg-secondary p-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-primary-foreground">{i + 1}</span>
              {a}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function List({ title, items, tone, mark }: { title: string; items: readonly string[]; tone: string; mark: string }) {
  return (
    <div>
      <div className="mb-3 text-sm font-bold">{title}</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span className={`font-bold ${tone}`}>{mark}</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
