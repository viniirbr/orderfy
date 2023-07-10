import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.upsert({
    where: {
      id: "a",
    },
    update: {},
    create: {
      id: "seeededId",
      customerEmail: "seededEmail@domain.com",
      customerName: "seededName",
      company: "seededCompany",
      time: new Date("2023-07-07T10:00:00.000Z"),
      address: "seededAddress",
      orderText: "seededOrderText",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });
