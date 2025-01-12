"use client";
import React from "react";
import { ProductWithSubCategoryAndBranch } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { updateProduct } from "@/app/actions/admin.products.actions";
import { ProductForm } from "@/shared/components/admin/products/ProductForm";
import {
  formProductSchema,
  TFormProductValues,
} from "@/shared/components/admin/products/schemas";
import { useBranches } from "@/shared/hooks";

interface Props {
  product: ProductWithSubCategoryAndBranch;
  className?: string;
}

export const EditProductForm: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  const defaultBranches = product.branchIds.map((item) => {
    return {
      id: item.branchId,
      quantity: item.totalQuantity,
    };
  });

  const form = useForm<TFormProductValues>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      branches: defaultBranches,
      image: product.imageUrl,
      subCategory: product.subCategory.name,
    },
  });

  const onSubmit = async (data: TFormProductValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name || product.name);
      formData.append("description", data.description || product.description);
      formData.append("price", String(data.price) || String(product.price));
      formData.append("image", data.image || product.imageUrl);
      formData.append("branches", JSON.stringify(data.branches));
      formData.append(
        "subCategory",
        data.subCategory || product.subCategory.name,
      );

      await updateProduct(product.id, formData);
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <ProductForm
        onSubmit={onSubmit}
        product={product}
        className={className}
      />
    </Form>
  );
};
