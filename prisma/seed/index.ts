import { PrismaClient } from '@prisma/client';
import { documentData } from './document';
import { folderData } from './folder';
import { userData } from './user';

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.$transaction([...(await userData({ prisma })), ...folderData({ prisma }), ...documentData({ prisma })]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
