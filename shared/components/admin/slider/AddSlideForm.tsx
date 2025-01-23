"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import {
  formSlideSchema,
  TFormSlideValues,
} from "@/shared/components/admin/slider/schema";
import { SlideForm } from "./SlideForm";
import { createSlide } from "@/app/actions/admin.slider.actions";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";

export const AddSlideForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<TFormSlideValues>({
    resolver: zodResolver(formSlideSchema),
    defaultValues: {
      heading: "",
      text: "",
      link: "",
      btnText: "",
    },
  });

  const onSubmit = async (data: TFormSlideValues) => {
    try {
      const formData = new FormData();

      formData.append("heading", data.heading);
      formData.append("text", data.text);
      formData.append("link", data.link);
      formData.append("image", data.image);
      formData.append("btnText", data.btnText);

      await createSlide(formData);
      router.push("/admin/slider");
      toast("Слайд добавлен", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось добавить слайд", toastError);
    }
  };

  return (
    <Form {...form}>
      <SlideForm onSubmit={onSubmit} />
    </Form>
  );
};
