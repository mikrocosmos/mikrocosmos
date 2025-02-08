import { ProductVary } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async () => {
  return (await axiosInstance.get<ProductVary[]>(ApiRoutes.PRODUCT_VARIES))
    .data;
};
