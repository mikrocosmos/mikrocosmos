"use server";
import { prisma } from "@/prisma/prisma-client";
import { getCategoryLastIndex } from "@/shared/lib/getCategoryLastIndex";

export async function updateCategory(id: number, name: string) {
  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}
export async function deleteCategory(id: number) {
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId: id,
    },
  });
  const products = await prisma.product.findMany({
    where: {
      subCategoryId: {
        in: subCategories.map((subCategory) => subCategory.id),
      },
    },
  });

  await prisma.branchToProduct.deleteMany({
    where: {
      productId: {
        in: products.map((product) => product.id),
      },
    },
  });

  await prisma.product.deleteMany({
    where: {
      subCategoryId: {
        in: subCategories.map((subCategory) => subCategory.id),
      },
    },
  });

  await prisma.subCategory.deleteMany({
    where: {
      categoryId: id,
    },
  });

  await prisma.category.delete({
    where: {
      id,
    },
  });
}
export async function createCategory(name: string, order?: number) {
  const categories = await prisma.category.findMany();
  const lastIndex = getCategoryLastIndex(categories);

  await prisma.category.create({
    data: {
      name: name,
      order: order || lastIndex + 1,
    },
  });
}
