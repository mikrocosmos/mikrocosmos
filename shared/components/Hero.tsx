"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getHeroSlider } from "@/shared/lib";
import { HeroSlide } from "@prisma/client";
import { HeroSliderItem } from "@/shared/components/";
import { Skeleton } from "@/shared/components/ui/";
import { deleteSlide } from "@/app/actions/admin.slider.actions";

interface Props {
  inAdmin?: boolean;
  className?: string;
}

export const Hero: React.FC<Props> = ({ className, inAdmin }) => {
  const [slides, setSlides] = React.useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const slides = await getHeroSlider();
        setSlides(slides);
      } catch (error) {
        console.error("[Hero]", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoading]);

  return (
    <div className={className}>
      {isLoading ? (
        <Skeleton className="w-[65vw] min-w-[300px] max-w-[1100px] mx-auto rounded-3xl h-[600px]" />
      ) : (
        <Carousel
          className="shadow-2xl"
          infiniteLoop
          swipeable
          autoPlay
          interval={5000}
          showThumbs={false}
          showStatus={false}
        >
          {slides.map((slide) => (
            <HeroSliderItem
              key={slide.id}
              id={slide.id}
              text={slide.text}
              imageUrl={slide.imageUrl}
              heading={slide.heading}
              setIsLoading={setIsLoading}
              btnText={inAdmin ? "Редактировать" : slide.btnText}
              link={inAdmin ? `/admin/slider/${slide.id}` : slide.link}
              inAdmin={inAdmin}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};
