import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام | Terms — صوت العميل" },
      { name: "description", content: "Terms of service for Voice of the Customer reports." },
      { property: "og:title", content: "Terms — Voice of the Customer" },
      { property: "og:description", content: "Terms of service." },
    ],
  }),
  component: () => {
    const { t, lang } = useLang();
    return (
      <Page>
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
          <h1 className="text-3xl font-black">{t.footer.terms}</h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "كل عملية شراء تشمل تقريراً واحداً لنشاط واحد. إذا تعذّر إعداد التقرير نعيد المبلغ كاملاً."
              : "Each purchase includes one report for one business. If we can't produce the report, you get a full refund."}
          </p>
        </div>
      </Page>
    );
  },
});
