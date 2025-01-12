"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  formProductSchema,
  TFormProductValues,
} from "@/shared/components/admin/products/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { createProduct } from "@/app/actions/admin.products.actions";
import { ProductForm } from "@/shared/components/admin/products/ProductForm";
import { useBranches } from "@/shared/hooks";
import { Branch } from "@prisma/client";

interface Props {
  branch: Branch[];
  className?: string;
}

export const AddProductForm: React.FC<Props> = ({ className, branch }) => {
  const router = useRouter();

  const defaultBranches = branch.map((item) => {
    return {
      id: item.id,
      quantity: 0,
    };
  });

  const form = useForm<TFormProductValues>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      branches: defaultBranches,
    },
  });

  const onSubmit = async (data: TFormProductValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("image", data.image);
      formData.append("branches", JSON.stringify(data.branches));
      formData.append("subCategory", data.subCategory);

      await createProduct(formData);
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <ProductForm onSubmit={onSubmit} className={className} />
    </Form>
  );
};
