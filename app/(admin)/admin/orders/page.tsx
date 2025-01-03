import { Container, Title } from "@/shared/components";
import { Orders } from "@/shared/components/admin";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminOrdersPage() {
  await checkAdmin(true);
  return (
    <Container className="admin-page">
      <Title text="Заказы" className="font-semibold" />
      <p>
        Здесь находятся все заказы. Вы можете сменить филиал, чтобы увидеть его
        заказы. В поле поиска можно ввести номер заказа для удобства поиска.
      </p>
      <Orders />
    </Container>
  );
}
