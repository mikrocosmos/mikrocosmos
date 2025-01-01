import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form";
import { Button, Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";
import { HeroSlide } from "@prisma/client";
import { TFormSlideValues } from "@/shared/components/admin/slider/schema";

interface Props {
  onSubmit: (data: TFormSlideValues) => void;
  slide?: HeroSlide;
  className?: string;
}

export const SlideForm: React.FC<Props> = ({ onSubmit, slide, className }) => {
  const form = useFormContext<TFormSlideValues>();

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <div className="flex gap-10">
        <div className="w-[700px] mt-5 flex flex-col gap-5">
          <FormField
            name="heading"
            control={form.control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Заголовок"
                placeholder={slide?.heading || "Заголовок"}
                name="heading"
              />
            )}
          />
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="Подпись"
                {...field}
                placeholder={slide?.text || "Подпись"}
                name="text"
              />
            )}
          />
          <FormField
            name="link"
            control={form.control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Ссылка"
                placeholder={slide?.link || "Ссылка"}
                name="link"
              />
            )}
          />
          <p className="text-sm">
            Если ссылка ведёт на страницу, которая находится на этом сайте, то
            можно указать в формате /product/10, то есть без полного адреса
            сайта
          </p>
          <FormField
            name="btnText"
            control={form.control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Текст кнопки"
                placeholder={slide?.btnText || "Текст кнопки"}
                name="btnText"
              />
            )}
          />

          <FormField
            name="image"
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
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
        </div>
      </div>
      <Button className="mt-4" type="submit" variant="white_accent">
        Сохранить
      </Button>
    </form>
  );
};
