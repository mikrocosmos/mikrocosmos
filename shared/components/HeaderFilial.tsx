"use client";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { AnimatedLink } from "./AnimatedLink";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useBranches } from "../hooks";
import { HeaderFilialItem } from "@/shared/components/HeaderFilialItem";
import { Skeleton } from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const HeaderFilial: React.FC<Props> = ({ className }) => {
  const { loading, branch } = useBranches();
  const [currentBranch, setCurrentBranch] = React.useState("Стройотрядовская");

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            "flex items-center whitespace-nowrap cursor-pointer group",
            className,
          )}
        >
          <ChevronDown
            size={20}
            className="group-hover:translate-y-0.5 transition duration-300"
          />
          {loading ? (
            <Skeleton className="ml-1 w-32 h-3" />
          ) : (
            <AnimatedLink
              text={currentBranch}
              className="ml-1 before:bottom-0"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          {branch.map((item) => (
            <HeaderFilialItem
              key={item.id}
              setCurrentBranch={setCurrentBranch}
              address={item.address}
              phone={item.phone}
              opensAt={item.opensAt}
              closesAt={item.closesAt}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
