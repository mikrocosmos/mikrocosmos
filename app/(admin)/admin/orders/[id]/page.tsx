import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Separator } from "@/shared/components/ui";
import { CartItem, Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { OrderStatusSelect } from "@/shared/components/admin/orders/OrderStatusSelect";
import { getUserSession } from "@/shared/lib/getUserSession";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminOrderPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  await checkAdmin(true);

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
    <Container className="admin-page">
      <div className="flex flex-col md:flex-row md:gap-10 items-center">
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
      <div className="flex flex-col md:flex-row w-[350px] text-lg mt-4">
        <div>Заказ на {order.totalPrice} ₽</div>
        <Separator
          orientation="vertical"
          className="mx-2 w-px h-6 bg-neutral-200 hidden md:block"
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
    </Container>
  );
}
