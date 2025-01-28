import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should show error for empty fields', async ({ page }) => {
    await page.waitForSelector('[data-testid="login-button"]', {
      state: 'visible',
    });
    await page.click('[data-testid="login-button"]');
    await expect(
      page.locator('text=メールアドレスとパスワードを入力してください。')
    ).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.waitForSelector('[data-testid="email-input"]', {
      state: 'visible',
    });
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await expect(
      page.locator('text=有効なメールアドレスを入力してください。')
    ).toBeVisible();
  });

  test('should not show error for valid input', async ({ page }) => {
    await page.waitForSelector('[data-testid="email-input"]', {
      state: 'visible',
    });
    await page.fill('[data-testid="email-input"]', 'valid@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await expect(
      page.locator('text=メールアドレスとパスワードを入力してください。')
    ).not.toBeVisible();
    await expect(
      page.locator('text=有効なメールアドレスを入力してください。')
    ).not.toBeVisible();
  });
});
