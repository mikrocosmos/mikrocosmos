"use server";

import { prisma } from "@/prisma/prisma-client";
import { getSlideFormData } from "@/shared/lib/getSlideFormData";
import { ImageUploader } from "@/shared/lib/imageUploader";

export async function createSlide(formData: FormData) {
  const data = getSlideFormData(formData);

  const uploader = new ImageUploader(data.image);

  const imageUrl = await uploader.upload();

  if (!imageUrl) {
    throw new Error("Image upload failed");
  }
  await prisma.heroSlide.create({
    data: {
      heading: data.heading,
      text: data.text,
      imageUrl,
      link: data.link,
      btnText: data.btnText,
    },
  });
}

export async function updateSlide(id: number, formData: FormData) {
  const data = getSlideFormData(formData);

  let imageUrl;

  if (data.image.name) {
    const uploader = new ImageUploader(data.image);

    imageUrl = await uploader.upload();

    if (!imageUrl) {
      throw new Error("Image upload failed");
    }
  }

  await prisma.heroSlide.update({
    where: { id },
    data: {
      heading: data.heading,
      text: data.text,
      imageUrl,
      link: data.link,
      btnText: data.btnText,
    },
  });
}

export async function deleteSlide(id: number) {
  const slide = await prisma.heroSlide.findFirst({
    where: { id },
  });

  if (!slide) {
    throw new Error("Slide not found");
  }

  const image = slide.imageUrl;

  await prisma.heroSlide.delete({
    where: {
      id,
    },
  });

  const uploader = new ImageUploader();
  await uploader.delete(image);
}
