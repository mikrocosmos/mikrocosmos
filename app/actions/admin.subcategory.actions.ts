"use server";

import { prisma } from "@/prisma/prisma-client";
import { ImageUploader } from "@/shared/lib/imageUploader";
import { deleteProductVary } from "@/app/actions/admin.productvary.actions";

export async function deleteSubCategory(id: number) {
  const subCategory = await prisma.subCategory.findFirst({
    where: {
      id,
    },
    include: {
      productVaries: true,
    },
  });

  if (!subCategory) {
    throw new Error("SubCategory not found");
  }
  const image = subCategory.imageUrl;

  subCategory.productVaries.forEach((productVary) => {
    deleteProductVary(productVary.id);
  });

  await prisma.subCategory.delete({
    where: {
      id,
    },
  });

  const uploader = new ImageUploader();
  await uploader.delete(image);
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

  const uploader = new ImageUploader(image);

  const imageUrl = await uploader.upload();

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
