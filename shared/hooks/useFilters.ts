import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
  min?: number;
  max?: number;
}

interface QueryFilters extends PriceProps {
  branches: number[];
}

export interface Filters {
  selectedBranches: Set<string>;
  price: PriceProps;
  priceStatic: Required<PriceProps>;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setBranches: (value: string) => void;
  clearBranches: () => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedBranches, { toggle: toggleBranches, clear: clearBranches }] =
    useSet(new Set<string>(searchParams.get("branches")?.split(",")));

  const priceStatic = { min: 0, max: 10000 };
  const [price, setPrice] = useState<PriceProps>({
    min: Number(searchParams.get("min")) || undefined,
    max: Number(searchParams.get("max")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    selectedBranches,
    price,
    priceStatic,
    setPrice: updatePrice,
    setBranches: toggleBranches,
    clearBranches: clearBranches,
  };
};
