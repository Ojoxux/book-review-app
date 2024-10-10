import { test, expect } from "@playwright/test";

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should show error for empty fields", async ({ page }) => {
    await page.click('button:has-text("ログイン")');
    await expect(
      page.locator("text=メールアドレスとパスワードを入力してください。")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should show error for invalid email", async ({ page }) => {
    await page.fill('input[type="email"]', "invalid-email");
    await page.fill('input[type="password"]', "password123");
    await page.click('button:has-text("ログイン")');
    await expect(
      page.locator("text=有効なメールアドレスを入力してください。")
    ).toBeVisible({ timeout: 10000 });
  });

  test("should not show error for valid input", async ({ page }) => {
    await page.fill('input[type="email"]', "valid@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button:has-text("ログイン")');
    await expect(
      page.locator("text=メールアドレスとパスワードを入力してください。")
    ).not.toBeVisible({ timeout: 10000 });
    await expect(
      page.locator("text=有効なメールアドレスを入力してください。")
    ).not.toBeVisible({ timeout: 10000 });
  });
});
