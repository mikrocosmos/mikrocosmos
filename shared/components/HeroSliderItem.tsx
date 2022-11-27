import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  heading: string;
  text: string;
  imageUrl: string;
  link: string;
  btnText: string;
  className?: string;
}

export const HeroSliderItem: React.FC<Props> = ({
  className,
  btnText,
  text,
  link,
  heading,
  imageUrl,
}) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        className="rounded-2xl object-cover min-h-[370px] max-h-[500px]"
        src={imageUrl}
        alt={heading}
        width={1920}
        height={1080}
      />
      <div className="absolute w-full bg-neutral-900/75 rounded-2xl left-0 top-0 p-5">
        <p className="text-xl text-left text-shadow">
          <strong className="text-primary text-2xl">{heading}</strong> <br />
          {text}
        </p>
      </div>
      <Link href={link}>
        <Button
          variant="white_accent"
          className="absolute bottom-8 left-8 text-xl"
        >
          {btnText}
        </Button>
      </Link>
    </div>
  );
};
