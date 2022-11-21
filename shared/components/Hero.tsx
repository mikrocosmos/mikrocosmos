"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Carousel
        infiniteLoop
        swipeable
        interval={5000}
        showThumbs={false}
        showStatus={false}
      >
        {/*{slides.map((slide) => (*/}
        {/*  <HeroSlide key={slide.id} />*/}
        {/*))}*/}
      </Carousel>
    </div>
  );
};
