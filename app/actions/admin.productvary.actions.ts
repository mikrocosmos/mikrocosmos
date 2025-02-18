"use server";

import { prisma } from "@/prisma/prisma-client";
import { ImageUploader } from "@/shared/lib/imageUploader";

export async function createProductVary(data: FormData) {
  const name = data.get("name") as string;
  const order = data.get("order") as string;
  const subCategoryName = data.get("subCategory") as string;
  const categoryId = data.get("categoryId") as string;
  const image = data.get("image") as File;

  const subCategory = await prisma.subCategory.findFirst({
    where: { name: subCategoryName, categoryId: Number(categoryId) },
  });

  if (!subCategory) {
    throw new Error("subCategory not found");
  }

  const uploader = new ImageUploader(image);

  const imageUrl = await uploader.upload();

  if (!imageUrl) {
    throw new Error("Image upload failed");
  }

  await prisma.productVary.create({
    data: {
      name,
      order: Number(order),
      subCategoryId: subCategory?.id,
      imageUrl,
    },
  });
}

export async function deleteProductVary(id: number) {
  const vary = await prisma.productVary.findFirst({
    where: {
      id,
    },
  });

  if (!vary) {
    throw new Error("SubCategory not found");
  }
  const image = vary.imageUrl;

  const products = await prisma.product.findMany({
    where: {
      varyId: vary.id,
    },
  });

  await prisma.branchToProduct.deleteMany({
    where: {
      productId: {
        in: products.map((product) => product.id),
      },
    },
  });

  await prisma.orderedProducts.deleteMany({
    where: {
      productId: {
        in: products.map((product) => product.id),
      },
    },
  });

  await prisma.product.deleteMany({
    where: {
      varyId: vary.id,
    },
  });

  await prisma.productVary.delete({
    where: {
      id,
    },
  });

  const uploader = new ImageUploader();
  await uploader.delete(image);
}

export async function updateProductVary(id: number, data: FormData) {
  const name = data.get("name") as string;
  const order = data.get("order") as string;
  const image = data.get("image") as File;
  const subCategoryName = data.get("subCategory") as string;
  const categoryId = data.get("categoryId") as string;

  const subCategory = await prisma.subCategory.findFirst({
    where: { name: subCategoryName, categoryId: Number(categoryId) },
  });

  const productVary = await prisma.productVary.findFirst({
    where: {
      id,
    },
  });

  if (!productVary) {
    throw new Error("ProductVary not found");
  }

  let imageUrl;

  if (image.name) {
    const uploader = new ImageUploader(image);

    imageUrl = await uploader.upload();

    if (!imageUrl) {
      throw new Error("Image upload failed");
    }
  }

  await prisma.productVary.update({
    where: {
      id,
    },
    data: {
      name,
      order: Number(order),
      imageUrl,
      subCategoryId: subCategory?.id,
    },
  });
}
