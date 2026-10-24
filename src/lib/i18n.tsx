import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

export const dict = {
  ar: {
    brand: "صوت العميل",
    tagline: "اعرف ماذا يقول عملاؤك فعلاً",
    cta: "احصل على تقريرك",
    heroTitle: "حوّل تقييمات قوقل إلى خطوات واضحة",
    heroSub: "الصق رابط مقهاك أو مطعمك على خرائط قوقل، ويحلل الذكاء الاصطناعي تقييمات عملائك ليخبرك بما يحبونه وما يزعجهم وما تصلحه أولاً.",
    form: {
      link: "رابط خرائط قوقل",
      linkPh: "https://maps.app.goo.gl/...",
      email: "البريد الإلكتروني",
      emailPh: "you@example.com",
      lang: "لغة التقرير",
      ar: "العربية",
      en: "English",
      submit: "احصل على تقريرك",
      loading: "جارٍ الإرسال...",
      errLink: "أدخل رابط خرائط قوقل صحيح (google.com/maps أو maps.app.goo.gl)",
      errEmail: "أدخل بريداً إلكترونياً صحيحاً",
      errLang: "اختر لغة التقرير",
      errServer: "تعذّر إرسال طلبك. حاول مرة أخرى بعد قليل.",
      note: "دفع آمن · تقرير واحد لكل عملية شراء",
    },
    howTitle: "كيف يعمل؟",
    steps: [
      ["الصق رابطك", "انسخ رابط نشاطك من خرائط قوقل والصقه في النموذج."],
      ["ادفع بأمان", "أكمل الدفع عبر بوابة آمنة وموثوقة."],
      ["استلم تقريرك خلال دقائق", "يصلك تقرير مفصّل على بريدك وعلى صفحة خاصة."],
    ],
    sampleTitle: "نموذج من التقرير",
    sampleSub: "مثال لما ستحصل عليه",
    sample: {
      shop: "مقهى الرمال · الرياض",
      score: "مؤشر رضا العملاء",
      reviews: "تقييم تم تحليله",
      praised: "أكثر ما يُمدح",
      complaints: "أبرز الشكاوى",
      actions: "ثلاث خطوات مقترحة",
      praisedList: ["جودة القهوة المختصة", "لطف فريق العمل", "هدوء الجلسات"],
      complaintsList: ["طول وقت الانتظار وقت الذروة", "قلة المواقف", "ارتفاع أسعار الحلويات"],
      actionsList: [
        "أضف باريستا إضافي من ٤ إلى ٨ مساءً",
        "وضّح أماكن المواقف القريبة في ملف قوقل",
        "قدّم عرض قهوة + حلى بسعر مخفّض",
      ],
    },
    insideTitle: "ماذا يحتوي التقرير؟",
    inside: [
      "تحليل مشاعر شامل لكل التقييمات",
      "أكثر المواضيع التي يمدحها عملاؤك",
      "أكثر الشكاوى تكراراً وأسبابها",
      "أولويات إصلاح مرتبة حسب الأثر",
      "اقتباسات حقيقية من العملاء",
      "تقرير بالعربية أو الإنجليزية",
    ],
    pricingTitle: "سعر واحد وواضح",
    plan: "تقرير كامل",
    price: "99",
    currency: "ر.س",
    per: "لكل تقرير",
    planFeatures: ["تحليل حتى آخر التقييمات المتاحة", "تقرير مفصّل خلال دقائق", "رابط خاص لمشاهدة التقرير", "دفعة واحدة بدون اشتراك"],
    faqTitle: "الأسئلة الشائعة",
    faq: [
      ["كيف تعمل الخدمة؟", "تلصق رابط نشاطك من خرائط قوقل، ثم نجمع التقييمات العامة ونحللها بالذكاء الاصطناعي ونرسل لك تقريراً واضحاً."],
      ["كم يستغرق التقرير؟", "عادةً بضع دقائق بعد إتمام الدفع، حسب عدد التقييمات."],
      ["هل بياناتي آمنة؟", "نستخدم التقييمات العامة فقط، ولا نشارك بريدك أو بياناتك مع أي طرف."],
      ["ما الأنشطة المدعومة؟", "المقاهي والمطاعم بشكل أساسي، وأي نشاط لديه تقييمات على خرائط قوقل."],
      ["هل يمكن استرداد المبلغ؟", "إذا لم نتمكن من إعداد تقريرك لأي سبب، نعيد لك المبلغ كاملاً."],
    ],
    footer: { privacy: "سياسة الخصوصية", terms: "الشروط والأحكام", rights: "جميع الحقوق محفوظة" },
    pay: {
      title: "صفحة الدفع",
      sub: "هنا ستظهر بوابة الدفع قريباً.",
      order: "رقم الطلب",
      continue: "متابعة (تجريبي)",
    },
    report: {
      preparing: "جارٍ إعداد تقريرك",
      preparingSub: "نحلل تقييمات عملائك الآن. ستصلك رسالة على بريدك عند الانتهاء، ويمكنك إبقاء هذه الصفحة مفتوحة.",
      steps: ["جمع التقييمات", "تحليل المشاعر", "استخراج التوصيات"],
      ready: "تقريرك جاهز",
    },
    back: "العودة للرئيسية",
  },
  en: {
    brand: "Voice of the Customer",
    tagline: "Know what your customers really say",
    cta: "Get My Report",
    heroTitle: "Turn Google reviews into clear actions",
    heroSub: "Paste your coffee shop or restaurant's Google Maps link. Our AI reads every review and tells you what customers love, what bothers them, and what to fix first.",
    form: {
      link: "Google Maps link",
      linkPh: "https://maps.app.goo.gl/...",
      email: "Email",
      emailPh: "you@example.com",
      lang: "Report language",
      ar: "العربية",
      en: "English",
      submit: "Get My Report",
      loading: "Sending...",
      errLink: "Enter a valid Google Maps link (google.com/maps or maps.app.goo.gl)",
      errEmail: "Enter a valid email address",
      errLang: "Choose a report language",
      errServer: "We couldn't send your order. Please try again shortly.",
      note: "Secure payment · One report per purchase",
    },
    howTitle: "How it works",
    steps: [
      ["Paste your link", "Copy your business link from Google Maps and paste it in the form."],
      ["Pay securely", "Complete checkout through a trusted, secure gateway."],
      ["Get your report in minutes", "A detailed report lands in your inbox and on a private page."],
    ],
    sampleTitle: "Sample report",
    sampleSub: "A preview of what you'll get",
    sample: {
      shop: "Al Rimal Café · Riyadh",
      score: "Customer sentiment score",
      reviews: "reviews analyzed",
      praised: "Top praised",
      complaints: "Top complaints",
      actions: "Three recommended actions",
      praisedList: ["Specialty coffee quality", "Friendly staff", "Calm seating"],
      complaintsList: ["Long waits at peak hours", "Limited parking", "Pricey desserts"],
      actionsList: [
        "Add one barista from 4–8 PM",
        "Show nearby parking on your Google profile",
        "Offer a discounted coffee + dessert combo",
      ],
    },
    insideTitle: "What's inside the report",
    inside: [
      "Full sentiment analysis of every review",
      "The topics customers praise most",
      "The most repeated complaints and why",
      "Fixes ranked by impact",
      "Real customer quotes",
      "Delivered in Arabic or English",
    ],
    pricingTitle: "One simple price",
    plan: "Full report",
    price: "99",
    currency: "SAR",
    per: "per report",
    planFeatures: ["Analysis of your latest available reviews", "Detailed report in minutes", "Private link to view your report", "One-time payment, no subscription"],
    faqTitle: "FAQ",
    faq: [
      ["How does it work?", "You paste your Google Maps link, we collect the public reviews, analyze them with AI, and send you a clear report."],
      ["How long does it take?", "Usually a few minutes after payment, depending on the number of reviews."],
      ["Is my data safe?", "We only use public reviews and never share your email or data with anyone."],
      ["Which businesses are supported?", "Mainly coffee shops and restaurants, but any business with Google Maps reviews works."],
      ["Can I get a refund?", "If we can't produce your report for any reason, you get a full refund."],
    ],
    footer: { privacy: "Privacy Policy", terms: "Terms of Service", rights: "All rights reserved" },
    pay: {
      title: "Payment",
      sub: "The payment gateway will appear here soon.",
      order: "Order ID",
      continue: "Continue (demo)",
    },
    report: {
      preparing: "Your report is being prepared",
      preparingSub: "We're analyzing your customer reviews now. We'll email you when it's done — feel free to keep this page open.",
      steps: ["Collecting reviews", "Analyzing sentiment", "Writing recommendations"],
      ready: "Your report is ready",
    },
    back: "Back to home",
  },
} as const;

export type Dict = (typeof dict)["ar"] | (typeof dict)["en"];

const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: "ar",
  t: dict.ar,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
  };

  return <Ctx.Provider value={{ lang, t: dict[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
