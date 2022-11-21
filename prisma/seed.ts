import { prisma } from "./prisma-client";
import { branches, categories, products } from "./constants";

async function up() {
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.branch.createMany({
    data: branches,
  });
  await prisma.product.createMany({
    data: products,
  });
  await prisma.heroSlide.createMany({
    data: [
      {
        id: 1,
        heading: "Мы открылись",
        text: "Теперь вы можете сделать первый заказ",
        imageUrl: "/assets/images/hero-carousel/hero1.jpg",
        link: "/contact",
        btnText: "Подробнее",
      },
      {
        id: 2,
        heading: "Получите скидку",
        text: "Если приведёте друга",
        imageUrl: "/assets/images/hero-carousel/hero2.jpg",
        link: "/contact",
        btnText: "Подробнее",
      },
      {
        id: 3,
        heading: "Как дела?",
        text: "Сюда можно вставить любой текст",
        imageUrl: "/assets/images/hero-carousel/hero3.jpg",
        link: "/contact",
        btnText: "И сюда",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Branch" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "HeroSlide" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
