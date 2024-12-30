import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Branch, BranchToProduct } from "@prisma/client";
import { Input } from "@/shared/components/ui";

interface Props {
  className?: string;
  branch: Branch[];
  branchToProducts?: BranchToProduct[];
}

export const BranchIdsFormField: React.FC<Props> = ({
  className,
  branch,
  branchToProducts,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={`branches`}
      render={() => (
        <FormItem>
          <div className="mb-3">
            <FormLabel className="text-base font-normal">Наличие</FormLabel>
          </div>
          <div className="flex flex-col gap-4">
            {branch.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <FormField
                    control={form.control}
                    name={`branches[${index}].id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="hidden" {...field} value={item.id} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`branches[${index}].quantity`}
                    render={({ field }) => (
                      <FormItem key={item.id} className="flex items-center">
                        <FormLabel className="font-normal text-base w-full">
                          {item.address}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min={0} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </FormItem>
      )}
    />
  );
};
