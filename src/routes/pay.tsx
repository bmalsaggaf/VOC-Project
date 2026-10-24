import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/pay")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  head: () => ({
    meta: [
      { title: "الدفع | Payment — صوت العميل" },
      { name: "description", content: "Complete your payment to receive your customer review report." },
      { property: "og:title", content: "Payment — Voice of the Customer" },
      { property: "og:description", content: "Complete your payment to receive your report." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PayPage,
});

// Placeholder: replace the button with the real checkout once payments are connected.
function PayPage() {
  const { t } = useLang();
  const { id } = Route.useSearch();
  return (
    <Page>
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="card-surface space-y-4 p-8 text-center">
          <h1 className="text-2xl font-black">{t.pay.title}</h1>
          <p className="text-muted-foreground">{t.pay.sub}</p>
          <div className="rounded-xl bg-secondary p-3 text-xs">
            {t.pay.order}: <span dir="ltr" className="font-mono">{id || "—"}</span>
          </div>
          <div className="text-4xl font-black">{t.price} <span className="text-base text-muted-foreground">{t.currency}</span></div>
          {id && (
            <Link to="/report/$id" params={{ id }} className="block rounded-xl bg-gradient-gold py-3 font-bold text-primary-foreground shadow-gold">
              {t.pay.continue}
            </Link>
          )}
        </div>
      </div>
    </Page>
  );
}
