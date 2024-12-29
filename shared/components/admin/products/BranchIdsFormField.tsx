import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { Branch } from "@prisma/client";

interface Props {
  className?: string;
  branch: Branch[];
}

export const BranchIdsFormField: React.FC<Props> = ({ className, branch }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="branchIds"
      render={() => (
        <FormItem>
          <div className="mb-3">
            <FormLabel className="text-base font-normal">Наличие</FormLabel>
          </div>
          <div className="flex flex-col gap-4">
            {branch.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="branchIds"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: number) => value !== item.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-base">
                        {item.address}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};
