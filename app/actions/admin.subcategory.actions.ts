"use server";

import { prisma } from "@/prisma/prisma-client";
import s3Storage from "@/storage/storage";

const BUCKET_NAME = "sub-categories";

export async function deleteSubCategory(id: number) {
  const subCategory = await prisma.subCategory.findFirst({
    where: {
      id,
    },
  });

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }
  const image = subCategory.imageUrl;

  await s3Storage.deleteObject(image, BUCKET_NAME);

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
    const imageData = Buffer.from(await image.arrayBuffer());

    imageUrl = await s3Storage.putObject(imageData, image.name, BUCKET_NAME);

    if (!imageUrl) {
      throw new Error("Image upload failed");
    }
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

  const imageData = Buffer.from(await image.arrayBuffer());

  const imageUrl = await s3Storage.putObject(
    imageData,
    image.name,
    BUCKET_NAME,
  );

  if (!imageUrl) {
    throw new Error("Image upload failed");
  }

  await prisma.subCategory.create({
    data: {
      name,
      order: Number(order),
      categoryId: categoryId?.id,
      imageUrl,
    },
  });
}
