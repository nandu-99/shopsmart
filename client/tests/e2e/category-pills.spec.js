import { expect, test } from "@playwright/test";

test.describe("Category Pills", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all 4 category pills are visible (Men, Women, Kids, Accessories)", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "Men", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Women", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Kids", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Accessories", exact: true }),
    ).toBeVisible();
  });

  test('"All" pill is visible', async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /^all$/i }).first(),
    ).toBeVisible();
  });

  test('clicking "Men" navigates to /collections?search=Men', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Men", exact: true }).click();
    await expect(page).toHaveURL(/\/collections\?search=Men/);
  });

  test('clicking "Women" navigates to /collections?search=Women', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Women", exact: true }).click();
    await expect(page).toHaveURL(/\/collections\?search=Women/);
  });

  test('clicking "Kids" navigates to /collections?search=Kids', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Kids", exact: true }).click();
    await expect(page).toHaveURL(/\/collections\?search=Kids/);
  });
});
