import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { Container, ProfileForm, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { orderStatusMap } from "@/shared/constants/";
import Link from "next/link";
import { Separator } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { getOrderStatusClass } from "@/shared/lib";

export default async function ProfilePage() {
  const session = await getUserSession();

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id),
    },
  });

  if (!session || !user) {
    return redirect("/404");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const separatorClass =
    "w-px h-6 bg-neutral-400 transition group-hover:bg-white hidden md:block";

  return (
    <Container className="page pb-5">
      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        <div>
          <Title text="Профиль" size="lg" className="font-bold mt-4" />
          <ProfileForm className="w-full lg:w-96" user={user} />
        </div>

        {orders.length > 0 && (
          <div className="bg-popover my-4 p-4 scrollable-container h-[600px] !rounded-2xl">
            <Title text="Заказы" size="md" className="font-bold" />
            {orders.map((order) => (
              <Link
                href={`/order/${order.id}`}
                key={order.id}
                className="flex flex-wrap flex-col md:flex-row items-center justify-between gap-4 p-4 mt-2 border border-neutral-400 transition hover:bg-primary hover:border-primary hover:shadow-md rounded-md group"
              >
                <div>Заказ №{order.id}</div>
                <Separator orientation="vertical" className={separatorClass} />
                <div>{order.totalPrice} ₽</div>
                <Separator orientation="vertical" className={separatorClass} />
                <div>Дата: {order.createdAt.toLocaleDateString()}</div>
                <Separator orientation="vertical" className={separatorClass} />
                <div>{order.branch.address}</div>
                <Separator orientation="vertical" className={separatorClass} />
                <div
                  className={cn(
                    getOrderStatusClass(order.status),
                    "px-4 py-2 rounded-lg font-medium transition group-hover:bg-primary group-hover:text-white",
                  )}
                >
                  {orderStatusMap.get(order.status)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
