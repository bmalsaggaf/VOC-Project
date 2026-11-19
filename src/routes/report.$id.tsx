import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/components/site";
import { useLang } from "@/lib/i18n";
import { fetchReport } from "@/lib/report";

export const Route = createFileRoute("/report/$id")({
  head: () => ({
    meta: [
      { title: "تقريرك | Your report — صوت العميل" },
      { name: "description", content: "Your Voice of the Customer review report." },
      { property: "og:title", content: "Your report — Voice of the Customer" },
      { property: "og:description", content: "Your AI customer review report." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { id } = Route.useParams();
  const { t } = useLang();
  const { data } = useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReport(id),
    refetchInterval: (q) => (q.state.data ? false : 10000),
  });

  return (
    <Page>
      <div className="bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-16">
          {data ? (
            <div className="space-y-6">
              <h1 className="font-display text-5xl leading-tight">{t.report.ready}</h1>
              <div className="card-surface grid gap-6 p-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="font-display text-7xl leading-none text-primary">
                    {data.score}
                  </div>
                </div>
                <ul className="space-y-1 text-sm">
                  {data.praised.map((p) => (
                    <li key={p}>＋ {p}</li>
                  ))}
                </ul>
                <ul className="space-y-1 text-sm">
                  {data.complaints.map((p) => (
                    <li key={p}>− {p}</li>
                  ))}
                </ul>
                <ol className="space-y-1 text-sm md:col-span-3">
                  {data.actions.map((a, i) => (
                    <li key={a}>
                      {i + 1}. {a}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="card-surface mx-auto max-w-lg space-y-6 p-8 text-center">
              <div
                className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] rounded-es-md bg-highlight font-display text-4xl text-highlight-foreground"
                aria-hidden="true"
              >
                …
              </div>
              <h1 className="font-display text-4xl leading-tight">{t.report.preparing}</h1>
              <p className="text-sm text-muted-foreground">{t.report.preparingSub}</p>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-2/5 animate-progress rounded-full bg-primary" />
              </div>
              <ul className="space-y-2 text-start text-sm">
                {t.report.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"
                      style={{ animationDelay: `${i * 300}ms` }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
              <div dir="ltr" className="font-mono text-xs text-muted-foreground">
                {id}
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
