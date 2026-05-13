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

const desktop = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 });
await desktop.goto(baseUrl, { waitUntil: "networkidle" });
await desktop.waitForTimeout(700);
await desktop.screenshot({ path: path.join(outDir, "packages-update-hero-1440.png"), fullPage: false });

await desktop.locator("#pricing").scrollIntoViewIfNeeded();
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: path.join(outDir, "packages-update-pricing-1440.png"), fullPage: false });

await desktop.locator("#booking").scrollIntoViewIfNeeded();
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: path.join(outDir, "packages-update-full-page-1440.png"), fullPage: true });
await desktop.close();

const mobile = await browser.newPage({
  viewport: { width: 390, height: 900 },
  deviceScaleFactor: 1,
  isMobile: true,
});
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: path.join(outDir, "packages-update-mobile-hero-390.png"), fullPage: false });

await mobile.locator("#pricing").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: path.join(outDir, "packages-update-mobile-pricing-390.png"), fullPage: false });

await mobile.locator("#route").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: path.join(outDir, "packages-update-route-390.png"), fullPage: false });

await mobile.locator("#booking").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: path.join(outDir, "packages-update-booking-390.png"), fullPage: false });
await mobile.close();

const overflow = [];
for (const width of [360, 375, 390, 430, 768]) {
  overflow.push(await checkOverflow(width));
}
await fs.writeFile(path.join(outDir, "packages-update-overflow.json"), JSON.stringify(overflow, null, 2));

await browser.close();

const bad = overflow.filter((item) => item.overflowing);
if (bad.length) {
  console.error("Mobile overflow detected:", JSON.stringify(bad, null, 2));
  process.exit(1);
}

console.log(`packages update screenshots written to ${outDir}`);
console.log(JSON.stringify(overflow, null, 2));
