import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const url = process.env.LIGHTHOUSE_URL || "http://127.0.0.1:5183";
const outDir = new URL("../reports/", import.meta.url);

await fs.mkdir(outDir, { recursive: true });

const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "info",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });

  if (!result) throw new Error("Lighthouse did not return a result");

  await fs.writeFile(new URL("lighthouse.html", outDir), result.report[0]);
  await fs.writeFile(new URL("lighthouse.json", outDir), result.report[1]);

  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [
      key,
      Math.round((category.score ?? 0) * 100),
    ]),
  );

  console.log("Lighthouse scores:", scores);
  console.log("Reports written to reports/lighthouse.html and reports/lighthouse.json");
} finally {
  try {
    await chrome.kill();
  } catch (error) {
    console.warn("Chrome cleanup warning:", error?.message ?? error);
  }
}
