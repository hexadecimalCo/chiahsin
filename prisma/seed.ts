import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "change-me-please";

  const passwordHash = await hashPassword(password);

  await prisma.adminUser.upsert({
    where: { username },
    update: {},
    create: { username, passwordHash },
  });

  console.log(`Seeded admin user: ${username}`);
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(`Using default password "${password}" — change it after first login.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
