import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "test-results", "reference-comparison");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5183/";

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(1400);
await page.screenshot({ path: path.join(outDir, "hero-1440-final-candidate.png"), fullPage: false });
await page.evaluate(async () => {
  const steps = 8;
  for (let index = 1; index <= steps; index += 1) {
    window.scrollTo(0, (document.documentElement.scrollHeight / steps) * index);
    await new Promise((resolve) => setTimeout(resolve, 260));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, "full-page-desktop-final-candidate.png"), fullPage: true });

await page.locator("#booking").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(outDir, "booking-final-candidate.png"), fullPage: false });

const mobile = await browser.newPage({
  viewport: { width: 390, height: 900 },
  deviceScaleFactor: 1,
  isMobile: true,
});
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(1400);
await mobile.screenshot({ path: path.join(outDir, "mobile-hero-390-final-candidate.png"), fullPage: false });
await mobile.locator("#booking").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: path.join(outDir, "mobile-booking-final-candidate.png"), fullPage: false });
await mobile.close();

const referenceUrl = pathToFileURL(path.join(root, "reference-target.png")).href;
const heroUrl = pathToFileURL(path.join(outDir, "hero-1440-final-candidate.png")).href;
const html = `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <title>Final candidate side-by-side</title>
    <style>
      body { margin: 0; background: #efe7d8; font-family: Arial, sans-serif; }
      .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
      figure { margin: 0; background: #f6f1e8; border: 2px solid rgba(16,20,17,.18); }
      figcaption { padding: 10px 12px; font-weight: 800; color: #101411; }
      img { display: block; width: 100%; height: auto; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <figure>
        <figcaption>reference-target.png</figcaption>
        <img src="${referenceUrl}" />
      </figure>
      <figure>
        <figcaption>final candidate hero 1440px</figcaption>
        <img src="${heroUrl}" />
      </figure>
    </div>
  </body>
</html>`;

const htmlPath = path.join(outDir, "hero-side-by-side-final-candidate.html");
await fs.writeFile(htmlPath, html);

const compare = await browser.newPage({ viewport: { width: 1800, height: 1200 }, deviceScaleFactor: 1 });
await compare.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
await compare.screenshot({ path: path.join(outDir, "hero-side-by-side-final-candidate.png"), fullPage: true });
await compare.close();

await browser.close();

console.log(`Final candidate screenshots written to ${outDir}`);
