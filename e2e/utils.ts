import { expect, Page } from '@playwright/test';
import { UserName, usersFixture } from '../mocks/user';

export function host(path: string) {
  return `${process.env.API_HOST}${path}`;
}

export function url(path: string) {
  return `${process.env.NEXT_PUBLIC_URL ?? 'http://127.0.0.1:3000'}${path}`;
}

export const getUser = (name: string) => usersFixture().find((user) => user.name === name);

export async function login({ page, userName = 'user01' }: { page: Page; userName?: UserName }) {
  const user = getUser(userName)!;
  await page.goto(url('/signin'));
  await page.locator('input[name="email"]').fill(user.email!);
  await page.locator('input[name="password"]').fill(user.password!);
  await page.getByRole('button', { name: 'ログイン' }).click();
}

export async function logout({ page }: { page: Page }) {
  await page.goto(url('/'));
  await page.getByLabel('メニューを開く').click();
  await page.getByRole('button', { name: 'ログアウト' }).click();
}

export async function assertUnauthorizedRedirect({ page, path }: { page: Page; path: string }) {
  await page.goto(url(path));
  await page.waitForURL(url('/signin'));
  await expect(page).toHaveTitle(`ログイン | Memorandum`);
}

export async function addFolder({ page }: { page: Page }) {
  await page.getByRole('button', { name: 'Add Folder' }).click();
  await expect(page.getByRole('link', { name: 'New Folder' }).first()).toBeVisible();
}

export async function addDocument({ page }: { page: Page }) {
  await page.getByRole('button', { name: 'Show Documents' }).first().click();
  await page.getByRole('button', { name: 'Add Document' }).first().click();
  await expect(page.getByRole('link', { name: 'New Document' }).first()).toBeVisible();
}
