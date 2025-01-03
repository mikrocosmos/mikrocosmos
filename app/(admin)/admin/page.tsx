import { Container, Title } from "@/shared/components";
import { sidebarItems } from "@/shared/constants";
import { Card } from "@/shared/components/admin";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminPage() {
  const session = await checkAdmin(true);

  return (
    <Container className="admin-page">
      <Title
        text="Панель управления"
        className="font-semibold text-center md:text-left"
      />
      <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-5">
        {sidebarItems(session?.role).map((item) => (
          <Card
            key={item.name}
            name={item.name}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
