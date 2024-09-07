import { AnimatedLink } from "@/shared/components/AnimatedLink";
import { CalendarCheck2, Phone } from "lucide-react";
import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  id: number;
  address: string;
  phone: string;
  opensAt?: string | null;
  closesAt?: string | null;
  daysOpen: string[];
  setCurrentBranch: (branch: number) => void;
  className?: string;
}

export const HeaderFilialItem = ({
  id,
  address,
  phone,
  opensAt,
  closesAt,
  daysOpen,
  setCurrentBranch,
  className,
}: Props) => {
  return (
    <li
      className={cn(
        "relative cursor-pointer transition duration-300 text-white p-4 before:h-px before:right-4 before:left-4 first-of-type:before:w-0 before:bg-white before:absolute before:top-0 hover:bg-secondary",
        className,
      )}
      onClick={() => setCurrentBranch(id)}
    >
      <AnimatedLink text={address} />
      <p className="flex items-center gap-2 my-2">
        <CalendarCheck2 size={16} />
        {daysOpen.length === 7
          ? "Ежедневно"
          : `${daysOpen[0]}-${daysOpen.at(-1)}`}
        ,&nbsp;
        {opensAt} - {closesAt}
      </p>
      <p className="flex items-center gap-2">
        <Phone size={16} />
        {phone}
      </p>
    </li>
  );
};
