import { z } from "zod";

export const formSlideSchema = z.object({
  heading: z.string().min(2, "Заголовок должен содержать не менее 2 символов"),
  text: z.string().min(2, "Подпись должна содержать не менее 2 символов"),
  link: z.string().min(2, "Ссылка должна содержать не менее 2 символов"),
  btnText: z
    .string()
    .min(2, "Текст кнопки должен содержать не менее 2 символов"),
  image: z
    .any()
    .refine((file: File) => file !== undefined, "Выберите картинку"),
});

export type TFormSlideValues = z.infer<typeof formSlideSchema>;
