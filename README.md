# LASERTAG School Landing

One-page advertising landing for laser tag graduation programs for 5-11 classes in Ivano-Frankivsk.

## Local Run

```bash
npm install
npm run dev
npm run build
```

The production build is created in `dist/`.

## GitHub Pages

Repository:

```txt
https://github.com/vtclb/landing-varta-school
```

GitHub Pages:

```txt
https://vtclb.github.io/landing-varta-school/
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

Prices are centralized in `src/data/content.ts`.

```txt
Стандарт — 450 грн / учасник
Топ — 600 грн / учасник
Максимум — 750 грн / учасник
```

Before launching ads, re-check that 450 / 600 / 750 грн are still current.

## Contacts

Current visible phone:

```txt
050 188 20 03
tel:+380501882003
```

## Assets And Context

Real photos and optimized webp files live in:

```txt
public/assets/photos
public/assets/optimized
public/assets/generated
```

Important context:

- Video on the site may be used only as an example of the tournament/game format, not as proof of the main location.
- Photos from outbound games must not be used as “Наша територія” photos.
- Territory section should use only images that honestly show the location, game field, covers, play area, or rest zone.

Do not commit `dist`, `node_modules`, `test-results`, `reports`, `backstop_data`, or temporary Chrome folders.

## Checks

```bash
npm run build
npm run test:a11y -- --project=desktop-chrome
npm run test:screenshots -- --project=desktop-chrome
```

## Before Production Launch

- Prices: confirm 450 / 600 / 750 грн for `Стандарт`, `Топ`, and `Максимум`.
- Phone: verify `050 188 20 03`.
- Messengers: add real Telegram, Viber, WhatsApp, Instagram and/or Facebook links where needed.
- Lead delivery: the form currently saves leads to `localStorage` under `varta_school_leads`; connect Telegram bot, Google Sheets, CRM, email, or webhook before paid traffic.
- Analytics: wire `src/lib/analytics.ts` to GA4, Meta Pixel, and Google Ads conversions after IDs are available.
- Ads: add Google Ads conversions if Google Ads traffic will be used.
- Domain: connect the production domain or keep GitHub Pages only for test deployment.
- QA: run Lighthouse and browser checks against the deployed URL.
