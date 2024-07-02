import test, { type Page, expect } from '@playwright/test';
import { createFolderId } from '../mocks';
import { login, url } from './utils';

type Target = {
  title: string;
  path: string;
};

test.describe('フォルダページ', () => {
  test.describe.configure({ mode: 'default' });

  const target = {
    ForRestore: { title: 'Folder 1', path: `/documents/${createFolderId(0)}` },
    ForDelete: { title: 'Folder 2', path: `/documents/${createFolderId(1)}` },
    ForUpdate: { title: 'Folder 3', path: `/documents/${createFolderId(2)}` },
  } satisfies Record<string, Target>;

  test.beforeEach(async ({ page }) => {
    await login({ page });
    await expect(page).toHaveURL(url('/'));
    await page.goto(url('/documents'));
  });

  test('「Add Folder」を押下時、フォルダが追加される', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Folder' }).click();
    await expect(page).toHaveTitle('New Folder | Memorandum');
  });

  test('フォルダをアーカイブ状態にできる', async ({ page }) => {
    await archiveFolder({ page, target: target['ForRestore'] });
    await expect(page).toHaveURL(url(target['ForRestore'].path));
    await page.goto(url('/documents'));
    await expect(page).toHaveURL(url('/documents'));
    await archiveFolder({ page, target: target['ForDelete'] });
    await expect(page).toHaveURL(url(target['ForDelete'].path));
  });

  test('アーカイブ状態のフォルダを復元することができる', async ({ page }) => {
    const title = target['ForRestore'].title;
    const path = url(target['ForRestore'].path);
    await page.goto(path);
    await expect(page).toHaveURL(path);
    await page.getByRole('button', { name: 'ページを復元' }).click();
    await page.waitForURL(path);
    await expect(page).toHaveTitle(`${title} | Memorandum`);
  });

  test('アーカイブ状態のフォルダを完全に削除することができる', async ({ page }) => {
    // confirm dialog setUp
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('このフォルダを完全に削除します\n紐づくドキュメントがある場合、同時に削除されます\n本当によろしいですか？');
      await dialog.accept();
    });
    const path = url(target['ForDelete'].path);
    await page.goto(path);
    await expect(page).toHaveURL(path);
    await page.getByRole('button', { name: 'ゴミ箱から削除' }).click();
    await page.waitForURL(url('/documents'));
    await expect(page).toHaveURL(url('/documents'));
  });

  test('フォルダのタイトルを更新できる', async ({ page }) => {
    const newTitle = 'Updated Folder';

    const path = url(target['ForUpdate'].path);
    await page.goto(path);
    await expect(page).toHaveURL(path);
    const textBox = page.getByRole('textbox', { name: 'タイトル' });
    await textBox.click();
    await textBox.fill(newTitle);
    await page.getByRole('button', { name: '更新する' }).click();
    await expect(page).toHaveTitle(`${newTitle} | Memorandum`);
  });
});

// Put the folder in archived and return to that page.
async function archiveFolder({ page, target }: { page: Page; target: Target }) {
  // confirm dialog setUp
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('紐づくドキュメントも同時にゴミ箱に移動されます\n本当によろしいですか？');
    await dialog.accept();
  });
  const documentsPage = page.url();
  // go to folder page
  await page.getByLabel(target.title).click();
  await page.waitForLoadState('networkidle');
  const folderPageUrl = page.url();
  // delete folder page, and redirect to all documents page
  await page.getByRole('button', { name: 'Show Folder Menu' }).click();
  await page.getByRole('button', { name: 'このフォルダを削除する' }).click();
  await page.waitForURL(documentsPage);
  // go to deleted folder page
  await page.goto(folderPageUrl);
  await page.waitForURL(folderPageUrl);
  await page.waitForLoadState('networkidle');
  // check if it is in archived condition
  await expect(page.getByText('このフォルダはゴミ箱にあります。')).toBeVisible();
}
