"use client";
import React from "react";
import { Title, RangeSlider, CheckboxFiltersGroup } from "./";
import {
  AccordionContent,
  AccordionItem,
  Input,
  Skeleton,
} from "@/shared/components/ui";
import { useBranches, useFilters, useQueryFilters } from "@/shared/hooks";
import { Accordion, AccordionTrigger } from "@/shared/components/ui/";

interface Props {
  maxPrice: number;
  minPrice: number;
  className?: string;
}

export const Filters: React.FC<Props> = ({ className, maxPrice, minPrice }) => {
  const { loading, branch } = useBranches();
  const filters = useFilters();
  useQueryFilters(filters);

  React.useEffect(() => {
    filters.priceStatic.max = maxPrice;
    filters.priceStatic.min = minPrice;
  }, []);

  const updatePrices = (prices: number[]) => {
    filters.setPrice("min", prices[0]);
    filters.setPrice("max", prices[1]);
  };

  const isFiltersChanged = () => {
    return (
      (filters.price.min !== undefined && filters.price.min !== minPrice) ||
      (filters.price.max !== undefined && filters.price.max !== maxPrice) ||
      filters.selectedBranches.size !== 0 ||
      false
    );
  };

  const onClear = () => {
    filters.setPrice("min", minPrice);
    filters.setPrice("max", maxPrice);
    filters.clearBranches();
  };

  return (
    <Accordion type="single" className={className} collapsible>
      <AccordionItem value="filters" className="border-0">
        <div className="flex items-center justify-between">
          <AccordionTrigger className="text-xl gap-2 p-0">
            Фильтры
          </AccordionTrigger>
          {isFiltersChanged() && (
            <span
              className="cursor-pointer hover:text-primary transition"
              onClick={onClear}
            >
              Очистить фильтры
            </span>
          )}
        </div>

        <AccordionContent>
          {loading ? (
            <Skeleton className="ml-1 w-32 h-3" />
          ) : (
            <CheckboxFiltersGroup
              title="Наличие:"
              name="branches"
              className="my-5"
              onClickCheckbox={filters.setBranches}
              selected={filters.selectedBranches}
              items={branch.map((item) => ({
                text: item.address,
                value: `${item.id}`,
              }))}
            />
          )}

          <div className="mt-5 border-t border-t-neutral-100 pt-6 pb-7">
            <p className="font-bold mb-3">Цена:</p>
            <div className="flex gap-3 mb-5 text-black">
              <Input
                type="number"
                placeholder={`${minPrice}`}
                min={minPrice}
                max={maxPrice}
                value={`${filters.price.min}`}
                onChange={(e) => filters.setPrice("min", +e.target.value)}
              />
              <Input
                type="number"
                placeholder={`${maxPrice}`}
                min={100}
                max={maxPrice}
                value={`${filters.price.max}`}
                onChange={(e) => filters.setPrice("max", +e.target.value)}
              />
            </div>
            <RangeSlider
              min={minPrice}
              max={maxPrice}
              step={10}
              value={[
                filters.price.min || minPrice,
                filters.price.max || maxPrice,
              ]}
              onValueChange={updatePrices}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
