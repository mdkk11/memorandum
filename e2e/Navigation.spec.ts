import { test, expect } from 'next/experimental/testmode/playwright/msw';
import { getUser, login, url } from './utils';

test.describe('サイドナビゲーション', () => {
  const path = '/documents';
  const user = getUser('user01')!;

  test.beforeEach(async ({ page }) => {
    await login({ page });
    await expect(page).toHaveURL(url('/'));
    await page.goto(url(path));
  });

  test('「User Menu」を押下時、自身のユーザー情報が表示される', async ({ page }) => {
    await page.getByRole('button', { name: user.name }).click();
    await expect(page.getByText(user.email!)).toBeVisible();
    await expect(page.getByRole('menuitem', { name: user.name })).toBeVisible();
  });

  test('「All Folders」を押下時、フォルダ一覧画面に遷移する', async ({ page }) => {
    await page.getByRole('link', { name: 'All Folders' }).click();
    await expect(page).toHaveURL(url(path));
  });

  test('「Trash Box」を押下時、アーカイブされているドキュメント一覧が表示される', async ({ page }) => {
    await page.getByRole('button', { name: 'Trash Box' }).first().click();
    await expect(page.getByRole('menu', { name: 'Trash Box' })).toBeVisible();
  });
});
