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
  console.log(data);
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
      categoryId: category.id,
    },
  });

  const allBranches = await prisma.branch.findMany();

  const branchToProducts = await prisma.branchToProduct.findMany({
    where: {
      productId: id,
    },
  });

  for (let i = 0; i < allBranches.length; i++) {
    if (!branchToProducts[i]) {
      await prisma.branchToProduct.create({
        data: {
          branchId: allBranches[i].id,
          productId: id,
          totalQuantity: 0,
        },
      });
    } else {
      await prisma.branchToProduct.update({
        where: {
          branchId_productId: {
            branchId: allBranches[i].id,
            productId: id,
          },
        },
        data: {
          totalQuantity: data.branches[i].quantity,
        },
      });
    }
  }
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id,
    },
  });

  await prisma.branchToProduct.deleteMany({
    where: {
      productId: id,
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

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      categoryId: category.id,
    },
  });

  const allBranches = await prisma.branch.findMany();

  for (let i = 0; i < allBranches.length; i++) {
    await prisma.branchToProduct.create({
      data: {
        branchId: allBranches[i].id,
        productId: product.id,
        totalQuantity: data.branches[i].quantity,
      },
    });
  }
}
