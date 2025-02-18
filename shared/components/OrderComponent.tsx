"use client";
import React from "react";
import { Title } from "@/shared/components/Title";
import { cn } from "@/shared/lib/utils";
import { getOrderStatusClass } from "@/shared/lib";
import { orderStatusMap } from "@/shared/constants";
import { Button } from "@/shared/components/ui";
import Link from "next/link";
import Image from "next/image";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import { Api } from "@/shared/services/api-client";
import { useRouter } from "next/navigation";
import { Phone } from "lucide-react";
import { OrderDetails } from "@/@types/prisma";

interface Props {
  order: OrderDetails;
}

export const OrderComponent: React.FC<Props> = ({ order }) => {
  const router = useRouter();

  const onCancelOrder = async () => {
    try {
      await Api.orders.changeStatus(Number(order.id), "CANCELED");
      router.back();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="adaptive">
        <Title text="Заказ оформлен" size="lg" className="font-bold" />

        <div
          className={cn(
            "md:ml-4 text-lg px-4 py-2 rounded-lg font-medium shadow-md flex items-center w-full md:w-auto",
            getOrderStatusClass(order.status),
          )}
        >
          {orderStatusMap.get(order.status)}
        </div>
      </div>
      <Title
        text={`Ваш номер заказа: ${order.id}`}
        size="md"
        className="font-bold mt-2"
      />
      <div className="mt-2 text-lg">
        <p>Заказ на {order.totalPrice} ₽</p>
        <p>
          Вы сможете забрать заказ в магазине по адресу:&nbsp;
          <b>{order.branch.address}</b>
        </p>
        <p>
          Если у вас есть вопросы по заказу, можете связаться с нами по
          телефону:&nbsp;
        </p>
        <div className="bg-success text-white p-4 my-2 rounded-lg w-[250px] text-center cursor-pointer transition hover:bg-primary flex items-center gap-2 justify-center shadow-lg">
          <Phone size={20} />
          <a href={`tel:${order.branch.phone}`} className="font-bold">
            {order.branch.phone}
          </a>
        </div>
        <p className="font-medium">
          При получении заказа при себе обязательно иметь документ,
          удостоверяющий личность. Без него Вы не сможете оплатить свой заказ.
        </p>
        <hr className="mt-2" />
      </div>
      {order.items.map((item) => (
        <div key={item.id}>
          <div className="adaptive mt-5">
            <Link href={`/product/${item.productId}`}>
              <Image
                className="rounded-3xl shadow-lg border-2 border-gray-200 object-cover md:w-[200px] w-full h-[200px] bg-white transition hover:border-primary"
                src={item.product.imageUrl}
                alt={item.product.name}
                width={200}
                height={200}
              />
            </Link>
            <div className="ml-5">
              <Link href={`/product/${item.product.id}`}>
                <Title
                  size="sm"
                  text={item.product.name}
                  className="font-bold mt-5 transition hover:text-primary cursor-pointer"
                />
              </Link>
              <p className="text-lg font-bold">{item.product.price} ₽</p>
              <p className="text-lg font-medium">Количество: {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
      {order.status === "PENDING" && (
        <AreYouSureConfirm onConfirm={onCancelOrder}>
          <Button variant="outline_red" className="mt-5">
            Отменить заказ
          </Button>
        </AreYouSureConfirm>
      )}
    </>
  );
};
