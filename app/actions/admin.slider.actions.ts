"use server";

import { prisma } from "@/prisma/prisma-client";
import { getSlideFormData } from "@/shared/lib/getSlideFormData";
import { ImageUploader } from "@/shared/lib/imageUploader";
import s3Storage from "@/storage/storage";

const BUCKET_NAME = "slider";

export async function createSlide(formData: FormData) {
  const data = getSlideFormData(formData);

  const image = Buffer.from(await data.image.arrayBuffer());

  const imageUrl = await s3Storage.putObject(
    image,
    data.image.name,
    BUCKET_NAME,
  );

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
    const image = Buffer.from(await data.image.arrayBuffer());

    imageUrl = await s3Storage.putObject(image, data.image.name, BUCKET_NAME);

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

  await s3Storage.deleteObject(image, BUCKET_NAME);

  await prisma.heroSlide.delete({
    where: {
      id,
    },
  });
}
