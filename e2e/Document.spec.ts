import test, { type Page, expect } from '@playwright/test';
import { createFolderId } from '../mocks';
import { login, url } from './utils';

type Target = {
  parentTitle: string;
  parentPath: string;
  title: string;
};

test.describe('ドキュメントページ', () => {
  test.beforeEach(async ({ page }) => {
    await login({ page });
    await expect(page).toHaveURL(url('/'));
    await page.goto(url('/documents'));
  });

  const target = {
    ForRestore: { parentTitle: 'Folder 4', parentPath: `/documents/${createFolderId(3)}`, title: 'Document 1' },
    ForDelete: { parentTitle: 'Folder 4', parentPath: `/documents/${createFolderId(3)}`, title: 'Document 2' },
  } satisfies Record<string, Target>;

  test('アーカイブ状態のドキュメントを復元することができる', async ({ page }) => {
    const title = target['ForRestore'].title;
    const { path } = await archiveDocument({ page, target: target['ForRestore'] });
    await page.goto(path);
    await expect(page).toHaveURL(path);
    await page.getByRole('button', { name: 'ページを復元' }).click();
    await page.waitForURL(path);
    await expect(page).toHaveTitle(`${title} | Memorandum`);
  });

  test('アーカイブ状態のドキュメントを完全に削除することができる', async ({ page }) => {
    // confirm dialog setUp
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('このドキュメントを完全に削除します\n本当によろしいですか？');
      await dialog.accept();
    });
    const { path } = await archiveDocument({ page, target: target['ForDelete'] });
    await page.goto(path);
    await expect(page).toHaveURL(path);
    await page.getByRole('button', { name: 'ゴミ箱から削除' }).click();
    await expect(page).toHaveURL(url('/documents'));
  });
});

async function archiveDocument({ page, target }: { page: Page; target: Target }): Promise<{ path: string }> {
  // Folder Page
  await page.getByLabel(target.parentTitle).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(`${target.parentTitle} | Memorandum`);

  // Document Page
  await page.getByLabel(target.title).click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(`${target.title} | Memorandum`);
  const documentPagePath = page.url();
  await page.getByRole('button', { name: 'Show Document Menu' }).click();
  await page.getByRole('button', { name: 'このドキュメントを削除する' }).click();
  await page.waitForURL(url(target.parentPath));

  // go to deleted folder page
  await page.goto(documentPagePath);
  await page.waitForURL(documentPagePath);

  // check if it is in archived condition
  await expect(page.getByRole('alert')).toBeVisible();
  return { path: documentPagePath };
}
