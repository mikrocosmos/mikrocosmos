import { Container, Title } from "@/shared/components";
import { Orders } from "@/shared/components/admin";

export default async function AdminOrdersPage() {
  return (
    <Container className="admin-page">
      <Title text="Заказы" className="font-semibold" />
      <Orders />
    </Container>
  );
}
