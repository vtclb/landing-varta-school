const baseUrl = process.env.BACKSTOP_BASE_URL || "http://127.0.0.1:5183";
const chromePath =
  process.env.CHROME_PATH || "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

module.exports = {
  id: "landing-varta-school",
  viewports: [
    { label: "desktop", width: 1440, height: 1050 },
    { label: "mobile", width: 390, height: 920 },
  ],
  scenarios: [
    { label: "hero", url: `${baseUrl}/` },
    { label: "benefits", url: `${baseUrl}/?shot=benefits` },
    { label: "route", url: `${baseUrl}/?shot=route` },
    { label: "trust", url: `${baseUrl}/?shot=trust` },
    { label: "territory", url: `${baseUrl}/?shot=territory` },
    { label: "booking", url: `${baseUrl}/?shot=booking` },
  ].map((scenario) => ({
    ...scenario,
    selectors: ["document"],
    delay: 800,
    misMatchThreshold: 0.2,
    readyEvent: "",
    readySelector: "",
    hideSelectors: [],
    removeSelectors: [],
  })),
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: {
    executablePath: chromePath,
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 4,
  asyncCompareLimit: 8,
  debug: false,
  debugWindow: false,
};
