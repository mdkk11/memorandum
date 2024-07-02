import { test } from 'next/experimental/testmode/playwright/msw';
import { assertUnauthorizedRedirect, url } from './utils';

test.describe('ドキュメント一覧ページ', () => {
  const path = '/documents';

  test('未ログイン時、ログイン画面にリダイレクトされる', async ({ page }) => {
    await page.goto(url(path));
    await assertUnauthorizedRedirect({ page, path });
  });
});
