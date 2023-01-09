import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  email: z
    .string()
    .email({ message: "Введите корректный адрес электронной почты" }),
  phone: z.string().min(10, "Телефон должен содержать не менее 10 символов"),
  branch: z.string(),
  comment: z.string().optional(),
  codeWord: z.string().optional(),
});

export type TCheckoutForm = z.infer<typeof checkoutFormSchema>;
