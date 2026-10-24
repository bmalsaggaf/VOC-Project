# صوت العميل

Build a bilingual (Arabic RTL + English) landing page and order flow for a SaaS product called "Voice of the Customer" (Arabic: "صوت العميل").

PRODUCT

Customers paste a Google Maps link of their coffee shop or restaurant. We analyze their Google reviews with AI and deliver a detailed report: what customers love, what they complain about, and what to fix first.

BRANDING

- Arabic name "صوت العميل" is the main brand in Arabic mode. "Voice of the Customer" is the main brand in English mode.

- Logo idea: a simple speech bubble combined with a star, text-based, no image files needed.

- Tagline (AR): "اعرف ماذا يقول عملاؤك فعلاً"

- Tagline (EN): "Know what your customers really say"

DESIGN

- Modern, clean, premium feel. Dark navy and warm gold accents, rounded cards, subtle animations.

- Mobile-first. Arabic is the default language with a visible AR / EN toggle in the header. Full RTL layout in Arabic. Use the Cairo font for Arabic and Inter for English.

LANDING PAGE SECTIONS

1. Header: logo, AR/EN toggle, "Get My Report" button (AR: "احصل على تقريرك").

2. Hero: strong headline about turning Google reviews into clear actions, a short subheadline, and the order form right in the hero.

3. How it works: three steps (Paste your link, Pay securely, Get your report in minutes).

4. Sample report preview: a styled mock report card showing a sentiment score, top praised topics, top complaints, and three recommended actions.

5. What's inside the report: short list of benefits.

6. Pricing: one single plan card with a placeholder price of 99 SAR, one report per purchase.

7. FAQ: 5 questions (how it works, how long it takes, is my data safe, which businesses are supported, refunds).

8. Footer: brand name, contact email, privacy policy and terms links.

ORDER FORM

Fields: Google Maps link (required, validate it contains google.com/maps or maps.app.goo.gl), email (required), report language (dropdown: Arabic or English, required).

On submit, send the data as a JSON POST request to a webhook URL stored in an environment variable called N8N_WEBHOOK_URL. Show a loading state, then redirect to a payment page placeholder. Add clear error messages in both languages.

RESULT PAGE

Create a /report/:id page that shows a "Your report is being prepared" state with a progress animation, and is ready to display a finished report fetched from a URL later.

Do not add authentication. Keep the code clean so I can connect payments and the backend afterwards.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f86e0cf-bfb6-5d00-9b62-32eac89b9e9a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
