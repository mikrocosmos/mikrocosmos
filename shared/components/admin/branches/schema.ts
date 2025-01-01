import { z } from "zod";

export const formBranchValues = z.object({
  address: z.string().min(1, "Адрес должен содержать не менее 1 символа"),
  phone: z.string().min(1, "Телефон должен содержать не менее 1 символа"),
  opensAt: z
    .string()
    .min(1, "Время открытия должно содержать не менее 1 символа"),
  closesAt: z
    .string()
    .min(1, "Время закрытия должно содержать не менее 1 символа"),
  yandexMapLink: z
    .string()
    .min(1, "Ссылка на Яндекс.Карты должна содержать не менее 1 символа"),
  daysOpen: z.array(z.string()).min(1, "Выберите хотя бы один день"),
});
export type TFormBranchValues = z.infer<typeof formBranchValues>;
