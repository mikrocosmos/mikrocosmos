"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import {
  createBranch,
  deleteBranch,
  updateBranch,
} from "@/app/actions/admin.branch.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import {
  formBranchValues,
  TFormBranchValues,
} from "@/shared/components/admin/branches/schema";
import { YandexInfo } from "@/shared/components/admin/branches/YandexInfo";
import { Info } from "lucide-react";
import { DaysCheckboxes } from "@/shared/components/admin/branches/DaysCheckboxes";

interface Props {
  className?: string;
}

export const AddBranchForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const form = useForm<TFormBranchValues>({
    resolver: zodResolver(formBranchValues),
    defaultValues: {
      address: "",
      phone: "",
      opensAt: "",
      closesAt: "",
      yandexMapLink: "",
      daysOpen: [],
    },
  });

  const onSubmit = async (data: TFormBranchValues) => {
    try {
      await createBranch({
        address: data.address,
        phone: data.phone,
        opensAt: data.opensAt,
        closesAt: data.closesAt,
        daysOpen: data.daysOpen,
        yandexMapLink: data.yandexMapLink.includes("iframe")
          ? data.yandexMapLink.split('src="')[1].split('" width')[0]
          : data.yandexMapLink,
      });
      router.push("/admin/branches");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Адрес"
              placeholder={"Адрес"}
              name="address"
            />
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Телефон"
              placeholder={"Телефон"}
            />
          )}
        />
        <FormField
          name="opensAt"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Время открытия"
              placeholder={"Время открытия"}
            />
          )}
        />
        <FormField
          name="closesAt"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Время закрытия"
              placeholder={"Время закрытия"}
            />
          )}
        />
        <FormField
          name="yandexMapLink"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Ссылка на Яндекс.Карты"
              placeholder={"Ссылка на Яндекс.Карты"}
            />
          )}
        />
        <YandexInfo className="mt-4 flex items-center gap-2">
          Подробнее <Info size={16} />
        </YandexInfo>
        <DaysCheckboxes />
        <div className="mt-4 flex items-center gap-5">
          <Button type="submit" variant="white_accent">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};
