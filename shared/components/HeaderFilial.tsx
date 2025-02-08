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
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export const HeaderFilial: React.FC<Props> = ({ className }) => {
  const { loading, branch } = useBranches();
  const { branchId, setBranchId } = branchStore((state) => state);

  const user = useSession();
  React.useEffect(() => {
    setBranchId(user?.data?.user.currentBranchId || 1);
  }, [setBranchId, user?.data?.user.currentBranchId]);

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
              text={
                branch.find((item) => item.id === branchId)?.address || "Адрес"
              }
              className="ml-1 before:bottom-0"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {branch.length > 0 ? (
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
        ) : (
          <div className="p-4">Филиалов нет, но они скоро будут</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
