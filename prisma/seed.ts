import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("secret", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@orderfy.com" },
    create: {
      name: "Admin",
      email: "admin@orderfy.com",
      password,
      company: "TestCo",
      role: "ADMIN",
    },
    update: {},
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@orderfy.com" },
    create: {
      name: "Customer",
      email: "customer@orderfy.com",
      password,
      company: "TestCo",
    },
    update: {},
  });

  const sandwichCategory = await prisma.category.upsert({
    where: { name: "Sandwiches" },
    create: {
      name: "Sandwiches",
    },
    update: {},
  });

  const saladCategory = await prisma.category.upsert({
    where: { name: "Salads" },
    create: {
      name: "Salads",
    },
    update: {},
  });

  Array.from({ length: 10 }, (_, x: number) => x + 1).forEach(async (i) => {
    await prisma.product.upsert({
      where: { name: `Sandwich ${i}` },
      create: {
        name: `Sandwich ${i}`,
        description: `Sandwich ${i} description`,
        price: 10,
        category: {
          connect: {
            id: sandwichCategory.id,
          },
        },
      },
      update: {},
    });
  });

  Array.from({ length: 10 }, (_, x: number) => x + 1).forEach(async (i) => {
    await prisma.product.upsert({
      where: { name: `Salad ${i}` },
      create: {
        name: `Salad ${i}`,
        description: `Salad ${i} description`,
        price: 10,
        category: {
          connect: {
            id: saladCategory.id,
          },
        },
      },
      update: {},
    });
  });

  console.log({ admin, customer });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });
