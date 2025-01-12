"use server";

import { prisma } from "@/prisma/prisma-client";
import { ImageUploader } from "@/shared/lib/imageUploader";

export async function deleteSubCategory(id: number) {
  const subCategory = await prisma.subCategory.findFirst({
    where: {
      id,
    },
  });

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }

  const products = await prisma.product.findMany({
    where: {
      subCategoryId: subCategory.id,
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
      subCategoryId: subCategory.id,
    },
  });

  await prisma.subCategory.delete({
    where: {
      id,
    },
  });
}

export async function updateSubCategory(id: number, data: FormData) {
  const name = data.get("name") as string;
  const order = data.get("order") as string;
  const category = data.get("category") as string;
  const image = data.get("image") as File;

  const subCategory = await prisma.subCategory.findFirst({
    where: {
      id,
    },
  });

  const categoryId = await prisma.category.findFirst({
    where: { name: category },
  });

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }

  let imageUrl;

  if (image.name) {
    const uploader = new ImageUploader(image);
    imageUrl = await uploader.upload();
  }

  await prisma.subCategory.update({
    where: {
      id,
    },
    data: {
      name,
      order: Number(order),
      categoryId: categoryId?.id,
      imageUrl,
    },
  });
}

export async function createSubCategory(data: FormData) {
  const name = data.get("name") as string;
  const order = data.get("order") as string;
  const category = data.get("category") as string;
  const image = data.get("image") as File;

  const categoryId = await prisma.category.findFirst({
    where: { name: category },
  });

  if (!categoryId) {
    throw new Error("Category not found");
  }

  const uploader = new ImageUploader(image);
  const imageUrl = await uploader.upload();

  await prisma.subCategory.create({
    data: {
      name,
      order: Number(order),
      categoryId: categoryId?.id,
      imageUrl,
    },
  });
}
