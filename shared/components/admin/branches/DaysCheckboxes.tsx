import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { days } from "@/shared/constants/days";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const DaysCheckboxes: React.FC<Props> = ({ className }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="daysOpen"
      render={() => (
        <FormItem>
          <div className="my-3">
            <FormLabel className="text-base font-normal">Открыто:</FormLabel>
          </div>
          <div className="flex flex-col gap-4">
            {days.map((day) => (
              <FormField
                key={day.name}
                control={form.control}
                name="daysOpen"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={day.name}
                      className="flex flex-row items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(day.name)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, day.name])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== day.name,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-base">
                        {day.name}
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
