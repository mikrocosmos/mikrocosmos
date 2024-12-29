"use server";

import { prisma } from "@/prisma/prisma-client";
import { ImageUploader } from "@/shared/lib/imageUploader";
import { getProductFormData } from "@/shared/lib/getProductFormData";

export async function getProducts(searchValue?: string) {
  if (!searchValue) {
    return prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  return prisma.product.findMany({
    where: {
      name: { contains: searchValue, mode: "insensitive" },
    },
    include: {
      category: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function updateProduct(id: number, formData: FormData) {
  const data = getProductFormData(formData);

  const category = await prisma.category.findFirst({
    where: {
      name: data.categoryName,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  let imageUrl;

  if (data.image.name) {
    const uploader = new ImageUploader(data.image);
    imageUrl = await uploader.upload();
  }

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      branchIds: data.branchIds,
      categoryId: category.id,
    },
  });
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function createProduct(formData: FormData) {
  const data = getProductFormData(formData);

  const category = await prisma.category.findFirst({
    where: {
      name: data.categoryName,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  if (!data.image) {
    throw new Error("Image is required");
  }

  const uploader = new ImageUploader(data.image);
  const imageUrl = await uploader.upload();

  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      branchIds: data.branchIds,
      categoryId: category.id,
    },
  });
}
