import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | Privacy Policy — صوت العميل" },
      { name: "description", content: "How Voice of the Customer handles your data." },
      { property: "og:title", content: "Privacy Policy — Voice of the Customer" },
      { property: "og:description", content: "How we handle your data." },
    ],
  }),
  component: () => {
    const { t, lang } = useLang();
    return (
      <Page>
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
          <h1 className="text-3xl font-black">{t.footer.privacy}</h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "نستخدم بريدك الإلكتروني ورابط نشاطك فقط لإعداد تقريرك وإرساله. نحلل التقييمات العامة فقط ولا نبيع بياناتك."
              : "We only use your email and business link to prepare and deliver your report. We analyze public reviews only and never sell your data."}
          </p>
        </div>
      </Page>
    );
  },
});
