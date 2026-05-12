import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "home", path: "/" },
  { name: "booking", path: "/?shot=booking" },
];

test.describe("accessibility smoke checks", () => {
  for (const item of pages) {
    test(`${item.name} has no critical accessibility violations`, async ({ page }) => {
      await page.goto(item.path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const serious = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
    });
  }
});
