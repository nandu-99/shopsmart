import { expect, test } from "@playwright/test";

test.describe("Mocked API E2E", () => {
  test("mocked GET /api/products renders product cards on collection", async ({
    page,
  }) => {
    await page.route("**/api/products*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            name: "Mock T-Shirt",
            price: 29.99,
            image: "https://placehold.co/400",
            description: "Mock",
            category: "Men",
            stock: 5,
          },
          {
            id: 2,
            name: "Mock Jeans",
            price: 59.99,
            image: "https://placehold.co/400",
            description: "Mock",
            category: "Men",
            stock: 5,
          },
        ]),
      });
    });

    await page.goto("/#/collections");
    await expect(page.getByText("Mock T-Shirt")).toBeVisible();
    await expect(page.getByText("Mock Jeans")).toBeVisible();
  });

  test("collection page survives /api/products 500", async ({ page }) => {
    await page.route("**/api/products*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/#/collections");
    await expect(page.getByText("SHOPSMART")).toBeVisible();
  });

  test("cart icon link is rendered on the navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "cart" })).toBeVisible();
  });
});
