import { expect, test } from "@playwright/test";

test.describe("Search Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("search input is visible with new placeholder", async ({ page }) => {
    const input = page.getByPlaceholder(/search products/i).first();
    await expect(input).toBeVisible();
  });

  test("typing in search updates input value", async ({ page }) => {
    const input = page.getByPlaceholder(/search products/i).first();
    await input.fill("jeans");
    await expect(input).toHaveValue("jeans");
  });

  test("submitting search navigates to /collections?search=...", async ({
    page,
  }) => {
    const input = page.getByPlaceholder(/search products/i).first();
    await input.fill("jeans");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/collections\?search=jeans/);
  });

  test("search input can be cleared", async ({ page }) => {
    const input = page.getByPlaceholder(/search products/i).first();
    await input.fill("sweater");
    await input.clear();
    await expect(input).toHaveValue("");
  });
});
