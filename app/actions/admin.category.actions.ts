"use server";
import { prisma } from "@/prisma/prisma-client";
import { getCategoryLastIndex } from "@/shared/lib/getCategoryLastIndex";
import { deleteSubCategory } from "@/app/actions/admin.subcategory.actions";

export async function updateCategory(id: number, name: string, order?: number) {
  const currentCategory = await prisma.category.findFirst({
    where: { id },
  });

  if (!currentCategory) {
    throw new Error("Category not found");
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      order,
    },
  });

  if (existingCategory) {
    await prisma.category.update({
      where: {
        id: existingCategory.id,
      },
      data: {
        order: currentCategory.order,
      },
    });
  }

  await prisma.category.update({
    where: { id },
    data: {
      name,
      order,
    },
  });
}

export async function deleteCategory(id: number) {
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      subCategories: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  category.subCategories.forEach((subCategory) => {
    deleteSubCategory(subCategory.id);
  });
}
export async function createCategory(name: string, order?: number) {
  const categories = await prisma.category.findMany();
  const lastIndex = getCategoryLastIndex(categories);

  const category = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (category) {
    throw new Error("Category already exists");
  }

  await prisma.category.create({
    data: {
      name: name,
      order: order || lastIndex + 1,
    },
  });
}
