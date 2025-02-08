import { z } from "zod";

export const formSubCategoryValues = z.object({
  name: z.string().min(1, "Название должно содержать не менее 1 символа"),
  order: z.coerce.number(),
  image: z
    .any()
    .refine((file: File) => file !== undefined, "Выберите картинку"),
  category: z.string().min(1, "Выберите категорию"),
});
export type TFormSubCategoryValues = z.infer<typeof formSubCategoryValues>;
