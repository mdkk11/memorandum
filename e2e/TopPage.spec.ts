import { test, expect } from '@playwright/test';
import { login, url } from './utils';

test.describe('トップページ', () => {
  test('ログイン時、リンクからドキュメント一覧画面に遷移できる', async ({ page }) => {
    await login({ page });
    await page.waitForURL(url('/'));
    await page.getByRole('link', { name: 'Enter Memorandum' }).click();
    await expect(page).toHaveURL(url('/documents'));
  });

  test('未ログイン時、ドキュメント一覧画面へのリンクが存在しない', async ({ page }) => {
    await page.goto(url('/'));
    const link = page.getByRole('link', { name: 'Enter Memorandum' });
    await expect(link).not.toBeVisible();
  });
});
