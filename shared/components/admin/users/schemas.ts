import { z } from "zod";

export const formEditUserSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export const formAddUserSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Введите корректный адрес электронной почты" }),
    name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
    phone: z.string().min(2, "Телефон должен содержать не менее 2 символов"),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
    passwordConfirm: z
      .string()
      .min(6, "Пароль должен содержать не менее 6 символов"),
    role: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли не совпадают",
    path: ["passwordConfirm"],
  });

export type TFormEditUserValues = z.infer<typeof formEditUserSchema>;
export type TFormAddUserValues = z.infer<typeof formAddUserSchema>;
