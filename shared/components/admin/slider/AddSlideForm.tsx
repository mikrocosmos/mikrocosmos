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

interface Props {
  className?: string;
}

export const AddSlideForm: React.FC<Props> = ({ className }) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <SlideForm onSubmit={onSubmit} />
    </Form>
  );
};
