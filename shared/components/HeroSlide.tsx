import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export const HeroSlide: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        className="rounded-2xl object-cover max-h-[500px]"
        src="/assets/images/hero-carousel/hero1.jpg"
        alt="hero"
        width={1920}
        height={1080}
      />
      <p className="absolute top-8 left-8 text-2xl text-left text-shadow">
        <strong className="text-primary">PLACEHOLDER TEXT</strong> <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <Button
        variant="white_accent"
        className="absolute bottom-8 left-8 text-xl"
      >
        Подробнее
      </Button>
    </div>
  );
};
