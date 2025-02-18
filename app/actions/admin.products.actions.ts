"use server";

import { prisma } from "@/prisma/prisma-client";
import { getProductFormData } from "@/shared/lib/getProductFormData";
import { ImageUploader } from "@/shared/lib/imageUploader";

export async function getProducts(searchValue?: string) {
  if (!searchValue) {
    return prisma.product.findMany({
      include: {
        vary: {
          include: {
            subCategory: {
              include: {
                category: true,
              },
            },
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
      vary: {
        include: {
          subCategory: {
            include: {
              category: true,
            },
          },
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
      name: data.categoryName,
    },
  });

  if (!category) {
    throw new Error("category not found");
  }

  const subCategory = await prisma.subCategory.findFirst({
    where: {
      name: data.subCategoryName,
      categoryId: category.id,
    },
  });

  if (!subCategory) {
    throw new Error("subCategory not found");
  }

  const productVary = await prisma.productVary.findFirst({
    where: {
      name: data.varyName,
      subCategoryId: subCategory.id,
    },
  });

  if (!productVary) {
    throw new Error("productVary not found");
  }

  let imageUpload;
  if (data.image.name) {
    const uploader = new ImageUploader(data.image);

    imageUpload = await uploader.upload();

    if (!imageUpload) {
      throw new Error("Image upload failed");
    }
  }

  const imageUrl = imageUpload ?? data.image.name;

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      varyId: productVary.id,
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
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const image = product.imageUrl;

  const uploader = new ImageUploader();
  await uploader.delete(image);

  await prisma.branchToProduct.deleteMany({
    where: {
      productId: id,
    },
  });

  await prisma.orderedProducts.deleteMany({
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
  console.log(data);

  const vary = await prisma.productVary.findFirst({
    where: {
      name: data.varyName,
    },
  });

  if (!vary) {
    throw new Error("vary not found");
  }

  if (!data.image) {
    throw new Error("Image is required");
  }

  const uploader = new ImageUploader(data.image);

  const imageUrl = await uploader.upload();

  if (!imageUrl) {
    throw new Error("Image upload failed");
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl,
      varyId: vary.id,
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
