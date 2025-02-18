import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Separator } from "@/shared/components/ui";
import Link from "next/link";
import Image from "next/image";
import { OrderStatusSelect } from "@/shared/components/admin/orders/OrderStatusSelect";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { OrderDetails } from "@/@types/prisma";
import { BuyerCard } from "@/shared/components/admin/orders/BuyerCard";
import React from "react";

export default async function AdminOrderPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const session = await checkAdmin(true);

  const order: OrderDetails | null = await prisma.order.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      branch: true,
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return redirect("/404");

  return (
    <Container className="admin-page w-full">
      <div className="adaptive md:gap-10 items-center">
        <Title text={`Заказ #${params.id}`} size="lg" className="font-bold" />
        <OrderStatusSelect
          className="w-[200px]"
          orderId={Number(params.id)}
          status={order.status}
        />
      </div>
      <div className="mt-4 text-lg">
        Дата: {order.createdAt.toLocaleString("ru")}
      </div>
      <div className="flex gap-2 items-center h-6 text-lg mt-4">
        <div>Заказ на {order.totalPrice} ₽</div>
        <Separator
          orientation="vertical"
          className="mx-2 w-[2px] h-6 bg-neutral-200"
        />
        <div>{order.branch.address}</div>
      </div>
      <div className="mt-4">
        <Title text="Покупатель" size="sm" className="font-bold" />
        {session?.role === "ADMIN" ? (
          <BuyerCard {...order.user} />
        ) : (
          <div>
            <p className="text-lg">
              Имя: <b>{order.user.name}</b>
            </p>
            {order.user.phone && (
              <p className="text-lg">
                Телефон: <b>{order.user.phone}</b>
              </p>
            )}
            <p className="text-lg">
              Email: <b>{order.user.email}</b>
            </p>
          </div>
        )}
      </div>
      {order.items.map((item) => (
        <div key={item.id}>
          <div className="adaptive mt-5">
            <Link href={`/product/${item.product.id}`}>
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
    </Container>
  );
}
