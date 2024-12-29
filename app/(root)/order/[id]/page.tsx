import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { CartItem, Product } from "@prisma/client";
import { orderStatusMap } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button, Separator } from "@/shared/components/ui";
import { getOrderStatusClass } from "@/shared/lib";
import { CancelOrderConfirm } from "@/shared/components/modals/CancelOrderConfirm";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      branch: true,
    },
  });
  if (!order) return redirect("/404");

  // @ts-ignore
  const items = JSON.parse(order.items);

  return (
    <Container className="page py-5">
      <div className="flex items-center">
        <Title text={`Заказ #${params.id}`} size="lg" className="font-bold" />
        <div
          className={cn(
            "ml-4 text-lg px-4 py-2 rounded-lg font-medium shadow-md",
            getOrderStatusClass(order.status),
          )}
        >
          {orderStatusMap.get(order.status)}
        </div>
      </div>
      <div className="flex w-[360px] text-lg mt-4">
        <div>Заказ на {order.totalPrice} ₽</div>
        <Separator
          orientation="vertical"
          className="mx-2 w-px h-6 bg-neutral-200"
        />
        <div>{order.branch.address}</div>
      </div>
      {items.map((item: CartItem & { product: Product }) => (
        <div key={item.id}>
          <div className="flex flex-col md:flex-row mt-5">
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
      {order.status === "PENDING" && (
        <CancelOrderConfirm id={Number(params.id)}>
          <Button variant="outline_red" className="mt-5">
            Отменить заказ
          </Button>
        </CancelOrderConfirm>
      )}
    </Container>
  );
}
