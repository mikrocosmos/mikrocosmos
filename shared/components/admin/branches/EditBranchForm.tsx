"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Branch } from "@prisma/client";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { deleteBranch, updateBranch } from "@/app/actions/admin.branch.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import {
  formBranchValues,
  TFormBranchValues,
} from "@/shared/components/admin/branches/schema";
import { YandexInfo } from "@/shared/components/admin/branches/YandexInfo";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { days } from "@/shared/constants/days";
import { Info } from "lucide-react";
import { DaysCheckboxes } from "@/shared/components/admin/branches/DaysCheckboxes";

interface Props {
  branch: Branch;
  className?: string;
}

export const EditBranchForm: React.FC<Props> = ({ className, branch }) => {
  const router = useRouter();

  const form = useForm<TFormBranchValues>({
    resolver: zodResolver(formBranchValues),
    defaultValues: {
      address: branch.address,
      phone: branch.phone,
      opensAt: branch.opensAt || undefined,
      closesAt: branch.closesAt || undefined,
      yandexMapLink: branch.yandexMapLink,
      daysOpen: branch.daysOpen,
    },
  });

  const onSubmit = async (data: TFormBranchValues) => {
    try {
      await updateBranch(branch.id, {
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

  const onDelete = async () => {
    await deleteBranch(branch.id);
    router.push("/admin/branches");
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
              placeholder={branch.address || "Адрес"}
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
              placeholder={branch.phone || "Телефон"}
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
              placeholder={branch.opensAt || "Время открытия"}
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
              placeholder={branch.closesAt || "Время закрытия"}
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
              placeholder={branch.yandexMapLink || "Ссылка на Яндекс.Карты"}
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
          <AreYouSureConfirm
            text="ВНИМАНИЕ! Удаление филиала приведёт к удалению всех заказов, связанных с этим филиалом."
            onConfirm={onDelete}
          >
            <Button type="button" variant="outline_red">
              Удалить
            </Button>
          </AreYouSureConfirm>
        </div>
      </form>
    </Form>
  );
};
