import { HeroSlide } from "@prisma/client";
import { axiosInstance } from "../services/instance";

export const getHeroSlider = async () => {
  return (await axiosInstance.get<HeroSlide[]>("/heroSlide")).data;
};
