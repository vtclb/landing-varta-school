# LASERTAG School Landing

One-page advertising landing for school graduations and active school programs in Ivano-Frankivsk.

## Local Run

```bash
npm install
npm run dev
npm run build
```

The production build is created in `dist/`.

## GitHub Pages

The project is prepared for GitHub Pages deployment through GitHub Actions.

Repository target:

```txt
landing-varta-school
```

For GitHub Pages builds, Vite uses:

```ts
base: "/landing-varta-school/"
```

This is enabled only when the build runs with:

```bash
GITHUB_PAGES=true npm run build
```

The workflow file is:

```txt
.github/workflows/deploy-pages.yml
```

After pushing to GitHub, open repository settings:

```txt
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

Expected Pages URL format:

```txt
https://USERNAME.github.io/landing-varta-school/
```

## Content

Main editable content:

```txt
src/data/content.ts
```

Asset paths:

```txt
src/data/assets.ts
src/data/media.ts
```

Analytics placeholders:

```txt
src/lib/analytics.ts
```

Current lead storage:

```txt
localStorage key: varta_school_leads
```

## Prices

Package prices are placeholders:

```txt
Standard — від ___ грн / учасник
Top — від ___ грн / учасник
Maximum — від ___ грн / учасник
```

Confirm actual prices before launching ads.

## Assets

Real photos and optimized webp files live in:

```txt
public/assets/photos
public/assets/optimized
public/assets/generated
```

Do not commit `dist`, `node_modules`, `test-results`, `reports`, `backstop_data`, or temporary Chrome folders.

## Checks

```bash
npm run build
npm run test:a11y -- --project=desktop-chrome
npm run test:screenshots -- --project=desktop-chrome
```

## Before Production Launch

- Contacts: replace the placeholder phone `+380000000000` with the real number.
- Messengers: add real Telegram, Viber, WhatsApp, Instagram and/or Facebook links where needed.
- Prices: confirm actual `Standard`, `Top`, and `Maximum` package prices before launching ads.
- Lead delivery: the form currently saves leads to `localStorage` under `varta_school_leads`; connect Telegram bot, Google Sheets, CRM, email, or webhook before paid traffic.
- Analytics: wire `src/lib/analytics.ts` to GA4, Meta Pixel, and Google Ads conversions after IDs are available.
- Domain: connect the production domain or keep GitHub Pages only for test deployment.
- QA: run Lighthouse and browser checks against the deployed URL.
