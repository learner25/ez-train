import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding users...');

  await prisma.user.createMany({
    data: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        emailVerified: true,
        image: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "2",
        name: "Sarah Smith",
        email: "sarah@example.com",
        emailVerified: false,
        image: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        emailVerified: true,
        image: null,
      },
    ],
  });

  console.log('Users created!');

  // Optional: Seed sessions
  await prisma.session.create({
    data: {
      id: "sess_1",
      token: "TOKEN_123",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userId: "1",
    },
  });

  // Optional: Seed accounts
  await prisma.account.create({
    data: {
      id: "acc_1",
      accountId: "123",
      providerId: "github",
      userId: "1",
      accessToken: "ABC123",
      refreshToken: "XYZ456",
    },
  });

  console.log("Sessions and Accounts created!");
}

main()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
