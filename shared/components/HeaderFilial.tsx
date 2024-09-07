"use client";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { AnimatedLink } from "./AnimatedLink";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useBranches } from "../hooks";
import { HeaderFilialItem } from "@/shared/components/HeaderFilialItem";
import { Skeleton } from "@/shared/components/ui";
import { branchStore } from "@/shared/store";

interface Props {
  className?: string;
}

export const HeaderFilial: React.FC<Props> = ({ className }) => {
  const { loading, branch } = useBranches();
  const { branchId, setBranchId } = branchStore((state) => state);

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
              text={branch[branchId - 1].address}
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
              id={item.id}
              setCurrentBranch={setBranchId}
              address={item.address}
              phone={item.phone}
              opensAt={item.opensAt}
              closesAt={item.closesAt}
              daysOpen={item.daysOpen}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
