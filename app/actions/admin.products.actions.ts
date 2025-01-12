"use server";

import { prisma } from "@/prisma/prisma-client";
import { ImageUploader } from "@/shared/lib/imageUploader";
import { getProductFormData } from "@/shared/lib/getProductFormData";
import { StorageFacade } from "@/storage/storageFacade";

export async function getProducts(searchValue?: string) {
  if (!searchValue) {
    return prisma.product.findMany({
      include: {
        subCategory: {
          include: {
            category: true,
          },
        },
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
      subCategory: {
        include: {
          category: true,
        },
      },
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
      name: data.subCategoryName,
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
      subCategoryId: category.id,
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
  await prisma.branchToProduct.deleteMany({
    where: {
      productId: id,
    },
  });

  await prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function createProduct(formData: FormData) {
  const data = getProductFormData(formData);

  const subCategory = await prisma.subCategory.findFirst({
    where: {
      name: data.subCategoryName,
    },
  });

  if (!subCategory) {
    throw new Error("subCategory not found");
  }

  if (!data.image) {
    throw new Error("Image is required");
  }

  const storage = new StorageFacade();
  const imageUrl = await storage.uploadItem(data.image);

  console.log(imageUrl);

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      subCategoryId: subCategory.id,
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
