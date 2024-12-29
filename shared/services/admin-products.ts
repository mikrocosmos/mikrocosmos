import { TFormEditProductValues } from "@/shared/components/admin/form/schemas";
import { axiosInstance } from "@/shared/services/instance";

export const updateProduct = async (
  id: number,
  data: TFormEditProductValues,
) => {
  return (await axiosInstance.patch(`/admin/products/${id}`, data)).data;
};
