"use client";
import React from "react";
import { useCart } from "@/shared/hooks";
import { useForm } from "react-hook-form";
import {
  checkoutFormSchema,
  TCheckoutForm,
  toastError,
} from "@/shared/constants/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const CheckoutForm: React.FC<Props> = ({ className }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const { loading } = useCart();
  const { data: session } = useSession();
  const form = useForm<TCheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: "",
      phone: "",
      branch: "",
      comment: "",
      codeWord: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      form.setValue("name", `${data.name} + ${data.surName}`);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: TCheckoutForm) => {
    try {
      setSubmitting(true);
    } catch (e) {
      console.error("[CHECKOUT], Client Error", e);
      toast("Не удалось оформить заказ", toastError);
    } finally {
      setSubmitting(false);
    }
  };

  return <div className={className}></div>;
};
