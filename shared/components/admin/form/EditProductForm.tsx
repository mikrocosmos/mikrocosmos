"use client";
import React from "react";
import { ProductWithCategory } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { updateProduct } from "@/app/actions/admin.actions";
import { ProductForm } from "@/shared/components/admin/form/ProductForm";
import {
  formProductSchema,
  TFormProductValues,
} from "@/shared/components/admin/form/schemas";

interface Props {
  product: ProductWithCategory;
  className?: string;
}

export const EditProductForm: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const form = useForm<TFormProductValues>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      branchIds: product.branchIds,
      image: product.imageUrl,
      category: product.category.name,
    },
  });

  const onSubmit = async (data: TFormProductValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name || product.name);
      formData.append("description", data.description || product.description);
      formData.append("price", String(data.price) || String(product.price));
      formData.append("image", data.image || product.imageUrl);
      formData.append("branchIds", JSON.stringify(data.branchIds));
      formData.append("category", data.category || product.category.name);

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
