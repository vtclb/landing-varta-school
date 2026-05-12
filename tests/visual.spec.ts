import { expect, test } from "@playwright/test";

const shots = [
  { name: "hero", path: "/" },
  { name: "benefits", path: "/?shot=benefits" },
  { name: "pricing", path: "/?shot=pricing" },
  { name: "route", path: "/?shot=route" },
  { name: "trust", path: "/?shot=trust" },
  { name: "territory", path: "/?shot=territory" },
  { name: "faq", path: "/?shot=faq" },
  { name: "booking", path: "/?shot=booking" },
];

test.describe("landing screenshots", () => {
  for (const shot of shots) {
    test(`${shot.name} screenshot`, async ({ page }, testInfo) => {
      await page.goto(shot.path);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("body")).toBeVisible();
      await page.screenshot({
        path: `test-results/screenshots/${testInfo.project.name}-${shot.name}.png`,
        fullPage: false,
      });
    });
  }
});

test("booking form stores selected package lead in localStorage", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Обрати пакет Maximum").click();

  const inputs = page.locator(".booking-form input");
  await inputs.nth(0).fill("Тест Клас");
  await inputs.nth(1).fill("+380000000000");
  await inputs.nth(2).fill("Ліцей 23, 9-Б");
  await inputs.nth(3).fill("24");
  await inputs.nth(4).fill("червень");
  await page.locator(".booking-form textarea").fill("Тестова заявка");
  await page.locator(".booking-form button[type=submit]").click();

  await expect(page.locator(".success-state")).toBeVisible();

  const leads = await page.evaluate(() => JSON.parse(localStorage.getItem("varta_school_leads") || "[]"));
  expect(leads[0]).toMatchObject({
    selectedPackage: "Maximum",
    name: "Тест Клас",
    phone: "+380000000000",
    school: "Ліцей 23, 9-Б",
    people: "24",
    date: "червень",
    comment: "Тестова заявка",
  });
});
