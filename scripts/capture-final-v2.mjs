import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const outDir = path.join(root, "test-results", "reference-comparison");
const suffix = process.env.SCREENSHOT_SUFFIX || "final-v2";

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
]);

function safeJoin(base, urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const full = path.resolve(base, `.${requested}`);
  if (!full.startsWith(base)) {
    return null;
  }
  return full;
}

const server = http.createServer(async (req, res) => {
  const filePath = safeJoin(distDir, req.url ?? "/");
  if (!filePath) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      "content-type": types.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(data);
  } catch {
    const fallback = await fs.readFile(path.join(distDir, "index.html"));
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    res.end(fallback);
  }
});

await fs.mkdir(outDir, { recursive: true });

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}/`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(outDir, `hero-1440-${suffix}.png`), fullPage: false });

await page.locator("#pricing").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, `pricing-${suffix}.png`), fullPage: false });

await page.locator("#route").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, `route-${suffix}.png`), fullPage: false });

await page.locator("#territory").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, `territory-${suffix}.png`), fullPage: false });

await page.locator("#booking").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, `booking-${suffix}.png`), fullPage: false });

await page.locator("#faq").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, `faq-${suffix}.png`), fullPage: false });

await page.evaluate(async () => {
  const steps = 8;
  for (let index = 1; index <= steps; index += 1) {
    window.scrollTo(0, (document.documentElement.scrollHeight / steps) * index);
    await new Promise((resolve) => setTimeout(resolve, 160));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(outDir, `full-page-desktop-${suffix}.png`), fullPage: true });

const mobile = await browser.newPage({
  viewport: { width: 390, height: 900 },
  deviceScaleFactor: 1,
  isMobile: true,
});
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(900);
await mobile.screenshot({ path: path.join(outDir, `mobile-hero-390-${suffix}.png`), fullPage: false });
await mobile.locator("#route").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: path.join(outDir, `mobile-route-390-${suffix}.png`), fullPage: false });
await mobile.locator("#territory").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: path.join(outDir, `mobile-territory-390-${suffix}.png`), fullPage: false });
await mobile.locator("#booking").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: path.join(outDir, `mobile-booking-${suffix}.png`), fullPage: false });
await mobile.close();

const referenceUrl = pathToFileURL(path.join(root, "reference-target.png")).href;
const heroUrl = pathToFileURL(path.join(outDir, `hero-1440-${suffix}.png`)).href;
const htmlPath = path.join(outDir, `hero-side-by-side-${suffix}.html`);
const html = `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <title>Final v2 side-by-side</title>
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
      <figure><figcaption>reference-target.png</figcaption><img src="${referenceUrl}" /></figure>
      <figure><figcaption>current hero ${suffix}</figcaption><img src="${heroUrl}" /></figure>
    </div>
  </body>
</html>`;
await fs.writeFile(htmlPath, html);

const compare = await browser.newPage({ viewport: { width: 1800, height: 1200 }, deviceScaleFactor: 1 });
await compare.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
await compare.screenshot({ path: path.join(outDir, `hero-side-by-side-${suffix}.png`), fullPage: true });
await compare.close();

await browser.close();
await new Promise((resolve) => server.close(resolve));

console.log(`${suffix} screenshots written to ${outDir}`);
