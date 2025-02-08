import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smoky Moon | Магазин вейпов и кальянов",
    short_name: "Smoky Moon",
    description:
      "Smoky Moon – сеть розничных магазинов по продаже  электронных сигарет, жидкостей, вейпов, комплектующих для вейпов и табачной продукции. На сайте представлен широкий выбор продукции, Удобный каталог, актуальная информация о продуктах и доступные цены.",
    start_url: "/",
    display: "standalone",
    background_color: "#4a4a4a",
    theme_color: "#4a4a4a",
    icons: [
      {
        src: "./favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
