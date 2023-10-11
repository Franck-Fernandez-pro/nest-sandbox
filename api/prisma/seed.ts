import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany();
  const alice = await prisma.donation.create({
    data: {
      email: 'amice@prisma.io',
      displayName: 'Alice',
      count: 5,
    },
  });

  console.log({ alice });
  await prisma.$disconnect();
}

main();
