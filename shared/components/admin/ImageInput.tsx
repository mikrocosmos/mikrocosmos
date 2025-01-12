import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const ImageInput: React.FC<Props> = ({ className }) => {
  const form = useFormContext();
  return (
    <FormField
      name="image"
      control={form.control}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem className={className}>
          <FormLabel>Изображение</FormLabel>
          <FormControl>
            <Input
              className="my-4 cursor-pointer"
              {...fieldProps}
              type="file"
              accept="image/*"
              onChange={(event) =>
                onChange(event.target.files && event.target.files[0])
              }
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
