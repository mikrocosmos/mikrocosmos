"use client";
import React from "react";
import { ProductWithCategory } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  formProductSchema,
  TFormProductValues,
} from "@/shared/components/admin/form/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form";
import { Button, Input, Skeleton, Textarea } from "@/shared/components/ui";
import { RequiredSymbol } from "@/shared/components";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useBranches, useCategories } from "@/shared/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { createProduct } from "@/app/actions/admin.actions";
import { ProductForm } from "@/shared/components/admin/form/ProductForm";

interface Props {
  className?: string;
}

export const AddProductForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const form = useForm<TFormProductValues>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      branchIds: [],
    },
  });

  const onSubmit = async (data: TFormProductValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("image", data.image);
      formData.append("branchIds", JSON.stringify(data.branchIds));
      formData.append("category", data.category);

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
