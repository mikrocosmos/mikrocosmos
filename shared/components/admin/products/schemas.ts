import { z } from "zod";

const branchSchema = z.object({
  id: z.number(),
  quantity: z.coerce.number().min(0, "Количество не может быть отрицательным"),
});

export const formProductSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  description: z
    .string()
    .min(2, "Описание должно содержать не менее 2 символов"),
  price: z.coerce.number().min(1, "Цена должна быть не менее 1"),
  image: z
    .any()
    .refine((file: File) => file !== undefined, "Выберите картинку"),
  category: z.string(),
  subCategory: z.string(),
  branches: z
    .array(branchSchema)
    .min(1, "Укажите количество хотя бы одного филиала"),
});

export type TFormProductValues = z.infer<typeof formProductSchema>;
