import { expect, test } from "@playwright/test";

test.describe("Navigation Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('clicking "About Us" navigates to /about', async ({ page }) => {
    await page.getByRole("link", { name: /about us/i }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(
      page.getByRole("heading", { name: /style that fits/i }),
    ).toBeVisible();
  });

  test('clicking "Blog" navigates to /blog', async ({ page }) => {
    await page.getByRole("link", { name: /blog/i }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(
      page.getByRole("heading", { name: /shopsmart journal/i }),
    ).toBeVisible();
  });

  test('clicking "FAQ" navigates to /faq', async ({ page }) => {
    await page.getByRole("link", { name: /^faq$/i }).click();
    await expect(page).toHaveURL(/\/faq/);
    await expect(
      page.getByRole("heading", { name: /frequently asked questions/i }),
    ).toBeVisible();
  });

  test("clicking SHOPSMART logo returns to home (/)", async ({ page }) => {
    await page.goto("#/about");
    await page.getByRole("link", { name: "SHOPSMART" }).click();
    await expect(page.locator("h1")).toContainText("Unleash Your Style");
  });

  test("clicking cart icon opens cart drawer", async ({ page }) => {
    await page.getByRole("link", { name: /cart/i }).click();
    await expect(page.getByRole("heading", { name: /your cart/i })).toBeVisible();
  });

  test("clicking login icon navigates to /login when unauthenticated", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /login/i }).first().click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('clicking "All" category pill navigates to /collections', async ({
    page,
  }) => {
    await page.getByRole("link", { name: /^all$/i }).click();
    await expect(page).toHaveURL(/\/collections/);
  });

  test('clicking "Men" pill navigates to /collections with search', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Men", exact: true }).click();
    await expect(page).toHaveURL(/\/collections\?search=Men/);
  });
});
