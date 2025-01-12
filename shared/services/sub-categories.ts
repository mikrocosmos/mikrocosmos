import { SubCategory } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async () => {
  return (await axiosInstance.get<SubCategory[]>(ApiRoutes.SUB_CATEGORIES))
    .data;
};
