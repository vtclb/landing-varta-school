import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "test-results", "reference-comparison");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5173/";

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

async function checkOverflow(width, height = 900) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: width < 800,
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const result = await page.evaluate(() => ({
    width: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflowing: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  await page.close();
  return result;
}

async function captureSection(page, selector, fileName) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  await page.screenshot({ path: path.join(outDir, fileName), fullPage: false });
}

const desktop = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 });
await desktop.goto(baseUrl, { waitUntil: "networkidle" });
await desktop.waitForTimeout(700);
await desktop.screenshot({ path: path.join(outDir, "update-offer-hero-1440.png"), fullPage: false });
await captureSection(desktop, "#pricing", "update-offer-pricing-1440.png");
await captureSection(desktop, "#outgoing", "update-offer-outgoing-games-1440.png");
await desktop.screenshot({ path: path.join(outDir, "update-offer-full-page-1440.png"), fullPage: true });
await desktop.close();

const mobile = await browser.newPage({
  viewport: { width: 390, height: 900 },
  deviceScaleFactor: 1,
  isMobile: true,
});
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: path.join(outDir, "update-offer-mobile-hero-390.png"), fullPage: false });
await captureSection(mobile, "#pricing", "update-offer-mobile-pricing-390.png");
await captureSection(mobile, "#outgoing", "update-offer-mobile-outgoing-games-390.png");
await captureSection(mobile, "#route", "update-offer-route-390.png");
await captureSection(mobile, "#territory", "update-offer-territory-390.png");
await captureSection(mobile, "#booking", "update-offer-booking-390.png");
await mobile.close();

const overflow = [];
for (const width of [360, 375, 390, 430, 768]) {
  overflow.push(await checkOverflow(width));
}
await fs.writeFile(path.join(outDir, "update-offer-overflow.json"), JSON.stringify(overflow, null, 2));

await browser.close();

const bad = overflow.filter((item) => item.overflowing);
if (bad.length) {
  console.error("Mobile overflow detected:", JSON.stringify(bad, null, 2));
  process.exit(1);
}

console.log(`offer update screenshots written to ${outDir}`);
console.log(JSON.stringify(overflow, null, 2));
