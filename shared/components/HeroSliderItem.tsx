import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import { CircleX } from "lucide-react";
import { deleteSlide } from "@/app/actions/admin.slider.actions";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  heading: string;
  setIsLoading: (isLoading: boolean) => void;
  text: string;
  imageUrl: string;
  link: string;
  btnText: string;
  inAdmin?: boolean;
  className?: string;
}

export const HeroSliderItem: React.FC<Props> = ({
  id,
  className,
  setIsLoading,
  btnText,
  text,
  link,
  heading,
  inAdmin,
  imageUrl,
}) => {
  const onDelete = async () => {
    setIsLoading(true);
    await deleteSlide(id);
  };
  return (
    <div className={cn("relative", className)}>
      <Image
        className="rounded-2xl object-cover min-h-[370px] max-h-[600px] lg:h-[600px]"
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
        {inAdmin && (
          <AreYouSureConfirm
            className="absolute top-6 right-6 text-destructive transition hover:text-white"
            onConfirm={onDelete}
          >
            <CircleX size={50} />
          </AreYouSureConfirm>
        )}
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
