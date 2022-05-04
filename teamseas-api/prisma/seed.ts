import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.donation.deleteMany();
  const vlad = await prisma.donation.create({
    data: {
      email: 'vlad@prisma.io',
      displayName: 'Vlad',
      count: 5,
    },
  });
  console.log({ vlad });
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
