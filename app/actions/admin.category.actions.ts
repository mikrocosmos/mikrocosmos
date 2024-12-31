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
  const products = await prisma.product.findMany({
    where: {
      categoryId: id,
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
  const lastIndex = await getCategoryLastIndex();

  await prisma.category.create({
    data: {
      name: name,
      order: order || lastIndex + 1,
    },
  });
}
