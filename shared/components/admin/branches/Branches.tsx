"use client";
import React from "react";
import { useBranches } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components/ui";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Branches: React.FC<Props> = ({ className }) => {
  const { branch, loading } = useBranches();
  return (
    <div className={cn("mt-5", className)}>
      {loading ? (
        <Skeleton className="w-96 h-20" />
      ) : (
        branch.map((item) => (
          <Link
            href={`/admin/branches/${item.id}`}
            key={item.id}
            className="mb-5 flex border-2 border-white rounded-3xl p-5 justify-between items-center gap-5 shadow-lg hover:border-primary hover:shadow-md transition hover:bg-primary group"
          >
            <div>
              <div className="text-lg font-bold">{item.address}</div>
              <div className="text-lg font-medium">{item.phone}</div>
            </div>
            <div>
              <div className="text-lg font-medium">
                <div className="text-lg font-medium">
                  {item.opensAt}-{item.closesAt}
                </div>
                {item.daysOpen.join(", ")}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
