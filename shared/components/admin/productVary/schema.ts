import { z } from "zod";

export const formProductVaryValues = z.object({
  name: z.string().min(1, "Название должно содержать не менее 1 символа"),
  order: z.coerce.number(),
  image: z
    .any()
    .refine((file: File) => file !== undefined, "Выберите картинку"),
  subCategory: z.string(),
  categoryId: z.number(),
});
export type TFormProductVaryValues = z.infer<typeof formProductVaryValues>;
