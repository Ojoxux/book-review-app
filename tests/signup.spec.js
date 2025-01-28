import { test, expect } from '@playwright/test';

test.describe('Signup Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // 登録ボタンをクリック
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されることを確認
    await expect(page.locator('text=ユーザ名は必須です。')).toBeVisible();
    await expect(page.locator('text=メールアドレスは必須です。')).toBeVisible();
    await expect(page.locator('text=パスワードは必須です。')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    // 無効なメールアドレスを入力
    await page.fill('#name', 'テストユーザー');
    await page.fill('#email', 'invalid-email');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されることを確認
    await expect(
      page.locator('text=有効なメールアドレスを入力してください。')
    ).toBeVisible();
  });

  test('should show error for short password', async ({ page }) => {
    // 短いパスワードを入力
    await page.fill('#name', 'テストユーザー');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '12345');
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されることを確認
    await expect(
      page.locator('text=パスワードは6文字以上である必要があります。')
    ).toBeVisible();
  });

  test('should handle successful signup', async ({ page }) => {
    // 有効な入力値を設定
    await page.fill('#name', 'テストユーザー');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // 成功メッセージが表示されることを確認
    await expect(
      page.locator('text=ユーザー登録が完了しました！')
    ).toBeVisible();
  });
});
