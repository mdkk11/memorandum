import { test, expect } from '@playwright/test';
import { login, logout, url } from './utils';

test.describe('認証', () => {
  test('未ログインの場合、ログインができる', async ({ page }) => {
    await login({ page });
    await expect(page).toHaveURL(url('/'));
    const userMenu = page.getByLabel('メニューを開く');
    await expect(userMenu).toBeVisible();
  });

  test('既にログインしている場合、ログアウトができる', async ({ page }) => {
    await login({ page });
    await expect(page).toHaveURL(url('/'));
    await logout({ page });
    await expect(page).toHaveURL(url('/'));
    const loginLink = page.getByRole('link', { name: 'ログイン' });
    await expect(loginLink).toBeVisible();
  });
});
