import { Container } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { OrderComponent } from "@/shared/components/OrderComponent";

export default async function OrderPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const order = await prisma.order.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      branch: true,
      user: true,
    },
  });
  if (!order) return redirect("/404");

  return (
    <Container className="page py-5">
      <OrderComponent order={order} />
    </Container>
  );
}
