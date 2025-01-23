"use client";
import React from "react";
import * as Checkout from "./index";
import { branchStore } from "@/shared/store";
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Skeleton,
} from "@/shared/components/ui/";
import { useBranches } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  const { branchId, setBranchId } = branchStore((state) => state);
  const { branch, loading } = useBranches();
  return (
    <Checkout.Block title="Адрес самовывоза" className={className}>
      {loading ? (
        <Skeleton className="w-full h-40 rounded-2xl" />
      ) : (
        <iframe
          src={branch.find((item) => item.id === branchId)?.yandexMapLink}
          className="border-0 w-full h-[300px] rounded-3xl"
        />
      )}
      {loading ? (
        <>
          <Skeleton className="w-full mt-4 h-6 rounded-2xl" />
        </>
      ) : (
        <RadioGroup
          name="branch"
          className="mt-4"
          defaultValue={String(branchId)}
        >
          {branch.map((item) => (
            <div key={item.id}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => setBranchId(item.id)}
                  value={`${item.id}`}
                />
                <Label className="text-lg" htmlFor={`${item.id}`}>
                  {item.address}
                </Label>
              </div>
              <div className="mt-1">
                <p>{item.phone}</p>
                <p>
                  {item.daysOpen.length === 7
                    ? "Ежедневно"
                    : `${item.daysOpen[0]}-${item.daysOpen.at(-1)}`}
                  , {item.opensAt}-{item.closesAt}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      )}
    </Checkout.Block>
  );
};
