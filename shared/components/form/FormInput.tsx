"use client";
import React from "react";
import {
  ClearButton,
  ErrorText,
  RequiredSymbol,
  ShowPasswordButton,
} from "@/shared/components/";
import { Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  type,
  label,
  required,
  placeholder,
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

  const [showPassword, setShowPassword] = React.useState(false);
  const onShowPassword = () => setShowPassword((prev) => !prev);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="h-9 text-md"
          placeholder={placeholder}
          {...props}
          {...register(name)}
        />
        <div className="flex">
          {value && type === "password" && (
            <ShowPasswordButton onClick={onShowPassword} className="mr-2" />
          )}
          {value && <ClearButton onClick={onClickClear} />}
        </div>
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
