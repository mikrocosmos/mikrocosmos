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
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  slide: HeroSlide;
}

export const EditSlideForm: React.FC<Props> = ({ slide }) => {
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
      toast("Слайд обновлён", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось обновить слайд", toastError);
    }
  };

  return (
    <Form {...form}>
      <SlideForm onSubmit={onSubmit} slide={slide} />
    </Form>
  );
};
