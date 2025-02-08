import { prisma } from "./prisma-client";
import {
  branches,
  branchToProduct,
  categories,
  products,
  productVaries,
  subCategories,
} from "./constants";
import { hashSync } from "bcryptjs";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: "Тимур",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        role: "ADMIN",
        currentBranchId: 1,
      },
      {
        name: "Юзер",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        role: "USER",
        currentBranchId: 1,
      },
      {
        name: "Кассир",
        email: "cashier@test.ru",
        password: hashSync("111111", 10),
        role: "CASHIER",
        currentBranchId: 1,
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.subCategory.createMany({
    data: subCategories,
  });

  await prisma.productVary.createMany({
    data: productVaries,
  });

  await prisma.branch.createMany({
    data: branches,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.branchToProduct.createMany({
    data: branchToProduct,
  });

  await prisma.heroSlide.createMany({
    data: [
      {
        id: 1,
        heading: "Мы открылись",
        text: "Теперь вы можете сделать первый заказ",
        imageUrl: "/assets/images/hero-carousel/hero1.jpg",
        link: "/product/10",
        btnText: "Подробнее",
      },
      {
        id: 2,
        heading: "Получите скидку",
        text: "Если приведёте друга",
        imageUrl: "/assets/images/hero-carousel/hero2.jpg",
        link: "/product/10",
        btnText: "Подробнее",
      },
      {
        id: 3,
        heading: "Как дела?",
        text: "Сюда можно вставить любой текст",
        imageUrl: "/assets/images/hero-carousel/hero3.jpg",
        link: "/product/10",
        btnText: "И сюда",
      },
    ],
  });
  await prisma.article.createMany({
    data: [
      {
        name: "Контакты",
        text: `Вы можете связаться с нами по этим номерам:

+7 (901) 029-20-20 (Стройотрядовская, 6)

+7 (830) 029-20-20 (Подшибякина,12)

Наша почта: example@mail.com

Наши адреса:

Стройотрядовская, 6

Подшибякина, 12

Ждём вас в нашем магазине!`,
      },
      {
        name: "Политика конфиденциальности",
        text: "<p><strong>bold text</strong></p><p><em>italic text</em></p><p><s>strike text</s></p><p></p><p>unordered list</p><ul><li><p>hey sg</p></li><li><p>sg</p></li><li><p>sgsgsg</p></li><li><p>hshs</p></li></ul><p></p><p>ordered list</p><ol><li><p>first</p></li><li><p>second</p></li><li><p>third</p></li><li><p>fourth</p></li></ol><p></p><blockquote><p>this is a quote probably</p></blockquote>",
      },
      {
        name: "Пользовательское соглашение",
        text: "lorem ipsum dolor sit amet consectetur adipiscing elit iriure non eleifend proident feugait option dolor hendrerit zzril cupiditat excepteur lobortis dignissim magna aliquam sed dignissim euismod praesent et accusam nonummy eleifend exerci feugait fugiat tincidunt odio sed wisi ad adipiscing aliquid ullamco fugiat velit mollit est luptatum nam cupiditat sadipscing sit te soluta eleifend justo adipiscing euismod sed veniam excepteur hendrerit nonumy stet nisi possim duo ea culpa vulputate mollit exerci velit tation nihil at aliquam delenit adipiscing consectetur incidunt",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Branch" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVary" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "BranchToProduct" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "HeroSlide" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Article" RESTART IDENTITY CASCADE;`;
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
