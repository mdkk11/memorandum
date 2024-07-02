import { PrismaClient, PrismaPromise, User } from '@prisma/client';

const encoder = new TextEncoder();

const getKeyMaterial = async (password: string) => {
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']);
  return keyMaterial;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await getKeyMaterial(password);
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );
  const hashBuffer = await crypto.subtle.exportKey('raw', key);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${saltHex}:${hashHex}`;
};

type UserData = Omit<User, 'createdAt' | 'updatedAt'>;

export type UserName = (typeof userNames)[number];
export const userNames = ['user01', 'user02', 'user03'] as const;
export const password = 'Password1234';
export const createUserId = (i: number) => `clw62ekoa00001nlbe24kfyu${i}`;

export const userFixture = (name: string, i: number): UserData => ({
  id: createUserId(i),
  name,
  email: `${name.toLowerCase()}@example.com`,
  emailVerified: null,
  image: null,
  password,
});

export const usersFixture = (): UserData[] => userNames.map((name, i) => userFixture(name, i));

export const users = async ({ prisma }: { prisma: PrismaClient }) => {
  const users: PrismaPromise<User>[] = [];
  for (const data of usersFixture()) {
    const hash = await hashPassword(data.password ?? password);
    const user = prisma.user.create({ data: { ...data, password: hash } });
    users.push(user);
  }
  return users;
};
