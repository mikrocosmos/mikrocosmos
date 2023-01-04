"use client";
import React from "react";
import { Title, RangeSlider, CheckboxFiltersGroup } from "./";
import { Input, Skeleton } from "@/shared/components/ui";
import { useBranches, useFilters, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { loading, branch } = useBranches();
  const filters = useFilters();
  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    filters.setPrice("min", prices[0]);
    filters.setPrice("max", prices[1]);
  };

  const isFiltersChanged = () => {
    return (
      (filters.price.min !== undefined && filters.price.min !== 0) ||
      (filters.price.max !== undefined && filters.price.max !== 10000) ||
      filters.selectedBranches.size !== 0 ||
      false
    );
  };

  const onClear = () => {
    filters.setPrice("min", 0);
    filters.setPrice("max", 10000);
    filters.clearBranches();
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Title text="Фильтры" size="sm" className="mb-5 font-bold" />
        {isFiltersChanged() && (
          <span
            className="cursor-pointer hover:text-primary transition mb-5"
            onClick={onClear}
          >
            Очистить фильтры
          </span>
        )}
      </div>

      {loading ? (
        <Skeleton className="ml-1 w-32 h-3" />
      ) : (
        <CheckboxFiltersGroup
          title="Наличие:"
          name="pizzaTypes"
          className="mb-5"
          onClickCheckbox={filters.setBranches}
          selected={filters.selectedBranches}
          items={[
            { text: branch[0].address, value: `${branch[0].id}` },
            { text: branch[1].address, value: `${branch[1].id}` },
          ]}
        />
      )}

      <div className="mt-5 border-t border-t-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена:</p>
        <div className="flex gap-3 mb-5 text-black">
          <Input
            type="number"
            placeholder={`${filters.priceStatic.min}`}
            min={filters.priceStatic.min}
            max={filters.priceStatic.max}
            value={`${filters.price.min}`}
            onChange={(e) => filters.setPrice("min", +e.target.value)}
          />
          <Input
            type="number"
            placeholder={`${filters.priceStatic.max}`}
            min={100}
            max={filters.priceStatic.max}
            value={`${filters.price.max}`}
            onChange={(e) => filters.setPrice("max", +e.target.value)}
          />
        </div>
        <RangeSlider
          min={filters.priceStatic.min}
          max={filters.priceStatic.max}
          step={10}
          value={[
            filters.price.min || filters.priceStatic.min,
            filters.price.max || filters.priceStatic.max,
          ]}
          onValueChange={updatePrices}
        />
      </div>
    </div>
  );
};
