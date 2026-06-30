import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display auth page', async ({ page }) => {
    await page.goto('/auth');
    await expect(page).toHaveTitle(/bl1nk/i);
  });

  test('should have login form elements', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('button')).toBeVisible();
  });

  test('visual regression - auth page', async ({ page }) => {
    await page.goto('/auth');
    await expect(page).toHaveScreenshot('auth-page.png');
  });

  test('visual regression - auth page dark mode', async ({ page }) => {
    await page.goto('/auth');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot('auth-page-dark.png');
  });
});
