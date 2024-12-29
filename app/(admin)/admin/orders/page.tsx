import { Container, Title } from "@/shared/components";
import { Orders } from "@/shared/components/admin";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }
  return (
    <Container className="admin-page">
      <Title text="Заказы" className="font-semibold" />
      <Orders />
    </Container>
  );
}
