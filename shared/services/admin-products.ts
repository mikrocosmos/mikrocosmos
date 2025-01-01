import { TFormProductValues } from "@/shared/components/admin/products/schemas";
import { axiosInstance } from "@/shared/services/instance";

export const updateProduct = async (id: number, data: TFormProductValues) => {
  return (await axiosInstance.patch(`/admin/products/${id}`, data)).data;
};
