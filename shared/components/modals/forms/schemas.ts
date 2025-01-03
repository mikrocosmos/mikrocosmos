import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Пароль должен содержать не менее 6 символов");

export const formLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Введите корректный адрес электронной почты" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
      phone: z.string().optional(),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
