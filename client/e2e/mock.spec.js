
import { expect, test } from '@playwright/test';

test('mocks API response', async ({ page }) => {
  // Mock the API call
  await page.route('/api', async route => {
    const json = {
      status: "ok",
      message: "E2E Mocked Message",
      timestamp: "2023-01-01T00:00:00Z",
    };
    await route.fulfill({ json });
  });

  await page.goto('/');

  // Expect the page to load without errors (checking title/header)
  await expect(page).toHaveTitle(/ShopSmart/);
  
  // Note: Since we are not currently displaying the API message in the UI (it's just console logged),
  // we can't easily assert on it without checking console logs or adding UI.
  // But this demonstrates how to mock the network request.
  
  // Let's verify the hero text is present
  await expect(page.getByText('Unleash Your Style')).toBeVisible();
});
