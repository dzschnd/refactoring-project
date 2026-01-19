import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = ["navsegda", "pinkVibe", "minimalism", "nezhnost", "red_velvet", "test"];

async function main() {
  for (const name of templates) {
    await prisma.template.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
