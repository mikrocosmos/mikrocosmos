import { Container, Title } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { sidebarItems } from "@/shared/constants";
import { Card } from "@/shared/components/admin";

export default async function AdminPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text={`Привет, ${session?.name}.`} className="font-semibold" />
      <div className="flex flex-wrap gap-5 mt-5">
        {sidebarItems.map((item) => (
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
