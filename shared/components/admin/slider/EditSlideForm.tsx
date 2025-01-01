"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { HeroSlide } from "@prisma/client";
import {
  formSlideSchema,
  TFormSlideValues,
} from "@/shared/components/admin/slider/schema";
import { SlideForm } from "./SlideForm";
import { updateSlide } from "@/app/actions/admin.slider.actions";

interface Props {
  slide: HeroSlide;
  className?: string;
}

export const EditSlideForm: React.FC<Props> = ({ slide, className }) => {
  const router = useRouter();

  const form = useForm<TFormSlideValues>({
    resolver: zodResolver(formSlideSchema),
    defaultValues: {
      heading: slide.heading,
      text: slide.text,
      image: slide.imageUrl,
      link: slide.link,
      btnText: slide.btnText,
    },
  });

  const onSubmit = async (data: TFormSlideValues) => {
    try {
      const formData = new FormData();

      formData.append("heading", data.heading || slide.heading);
      formData.append("text", data.text || slide.text);
      formData.append("link", data.link || slide.link);
      formData.append("image", data.image || slide.imageUrl);
      formData.append("btnText", data.btnText || slide.btnText);

      await updateSlide(slide.id, formData);
      router.push("/admin/slider");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <SlideForm onSubmit={onSubmit} slide={slide} />
    </Form>
  );
};
