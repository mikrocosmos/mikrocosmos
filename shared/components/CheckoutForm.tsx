"use client";
import React from "react";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import {
  checkoutFormSchema,
  TCheckoutForm,
  toastError,
  toastSuccess,
} from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import toast from "react-hot-toast";
import { createOrder } from "@/app/actions/actions";
import { Title } from "@/shared/components/Title";
import * as Checkout from "@/shared/components/checkout";
import { branchStore } from "@/shared/store";

interface Props {
  className?: string;
}

export const CheckoutForm: React.FC<Props> = ({ className }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const { loading } = useCart();
  const { data: session } = useSession();
  const branchId = branchStore((state) => state.branchId);
  const form = useForm<TCheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: "",
      phone: "",
      branch: branchId,
      comment: "",
      codeWord: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      form.setValue("name", data.name);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }

    form.setValue("branch", branchId);
  }, [session, branchId]);

  const onSubmit = async (data: TCheckoutForm) => {
    try {
      setSubmitting(true);
      const url = await createOrder({
        ...data,
        userId: Number(session?.user?.id),
      });

      if (url) {
        location.href = url;
      }
      toast("Заказ оформлен", toastSuccess);
    } catch (e) {
      console.error("[CHECKOUT], Client Error", e);
      toast("Не удалось оформить заказ", toastError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Title text="Оформление заказа" size="lg" className="font-bold my-2" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="md:flex md:gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-10">
              <Checkout.Cart
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <Checkout.Personal
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <Checkout.Address
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <div className="md:w-[450px] mb-10">
              <Checkout.Total submitting={submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
