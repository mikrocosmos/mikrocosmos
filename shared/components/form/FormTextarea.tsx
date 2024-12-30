"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { ClearButton } from "../ClearButton";
import { RequiredSymbol } from "@/shared/components/";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="mb-2">
        {label} {required && <RequiredSymbol />}
      </p>

      <div className="relative">
        <Textarea
          className="h-12 text-md text-black bg-white"
          {...register(name)}
          {...props}
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
