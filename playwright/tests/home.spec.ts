import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/bl1nk/i);
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('visual regression - home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
    });
  });

  test('responsive - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-mobile.png');
  });
});
