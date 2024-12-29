import { z } from "zod";

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
  branchIds: z.array(z.number()),
});

export type TFormProductValues = z.infer<typeof formProductSchema>;
