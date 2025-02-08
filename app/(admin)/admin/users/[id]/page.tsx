import { Container, Title } from "@/shared/components";

import { EditUserForm } from "@/shared/components/admin/users/EditUserForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import {OrderCard} from "@/shared/components/admin/orders/OrderCard";
import React from "react";

export default async function AdminUserPage({
  params,
}: {
  params: { id: string };
}) {
  await checkAdmin();
  const user = await prisma.user.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      orders: true,
    }
  });

  if (!user) {
    return redirect("/404");
  }
  return (
    <Container className="admin-page">
      <Title text={user.name} className="font-semibold" />
      <EditUserForm user={user} />
      <Title text="Заказы" className="font-semibold mt-4" />
      <div className="mt-4">
        {user.orders.map((order) => (
          <OrderCard key={order.id} order={order}/>
        ))}
      </div>
    </Container>
  );
}
