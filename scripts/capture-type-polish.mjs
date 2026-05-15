import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "test-results", "reference-comparison");
let baseUrl = process.env.PLAYWRIGHT_BASE_URL;
let server;

async function serveDist() {
  const dist = path.join(root, "dist");
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };

  server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith("/landing-varta-school/")) pathname = pathname.replace("/landing-varta-school", "");
    if (pathname === "/") pathname = "/index.html";
    const file = path.normalize(path.join(dist, pathname));
    if (!file.startsWith(dist)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    try {
      const data = await fs.readFile(file);
      res.writeHead(200, { "content-type": mime[path.extname(file)] ?? "application/octet-stream" });
      res.end(data);
    } catch {
      const html = await fs.readFile(path.join(dist, "index.html"));
      res.writeHead(200, { "content-type": mime[".html"] });
      res.end(html);
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return `http://127.0.0.1:${address.port}/`;
}

await fs.mkdir(outDir, { recursive: true });
if (!baseUrl) baseUrl = await serveDist();

const browser = await chromium.launch({ channel: "chrome" });

async function checkOverflow(width, height = 900) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 800 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(450);
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
await desktop.waitForTimeout(650);
await desktop.screenshot({ path: path.join(outDir, "type-polish-hero-1440.png"), fullPage: false });
await captureSection(desktop, "#pricing", "type-polish-pricing-1440.png");
await desktop.screenshot({ path: path.join(outDir, "type-polish-full-page-1440.png"), fullPage: true });
await desktop.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1, isMobile: true });
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(650);
await mobile.screenshot({ path: path.join(outDir, "type-polish-mobile-hero-390.png"), fullPage: false });
await captureSection(mobile, "#pricing", "type-polish-mobile-pricing-390.png");
await captureSection(mobile, "#route", "type-polish-route-390.png");
await captureSection(mobile, "#territory", "type-polish-territory-390.png");
await captureSection(mobile, "#booking", "type-polish-booking-390.png");
await mobile.close();

const overflow = [];
for (const width of [360, 375, 390, 430, 768]) overflow.push(await checkOverflow(width));
await fs.writeFile(path.join(outDir, "type-polish-overflow.json"), JSON.stringify(overflow, null, 2));

await browser.close();
if (server) await new Promise((resolve) => server.close(resolve));

const bad = overflow.filter((item) => item.overflowing);
if (bad.length) {
  console.error("Mobile overflow detected:", JSON.stringify(bad, null, 2));
  process.exit(1);
}

console.log(`type polish screenshots written to ${outDir}`);
console.log(JSON.stringify(overflow, null, 2));
