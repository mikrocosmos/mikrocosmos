import { checkAdmin } from "@/shared/lib/checkAdmin";
import { Container, Title } from "@/shared/components";
import { Branches } from "@/shared/components/admin/branches/Branches";
import { Button } from "@/shared/components/ui";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default async function AdminBranchesPage() {
  await checkAdmin();

  return (
    <Container className="admin-page">
      <div className="adaptive gap-2 md:gap-0 items-center justify-between">
        <Title text="Филиалы" className="font-semibold" />
        <Link href="/admin/branches/add">
          <Button variant="white_accent" className="flex items-center gap-2">
            <CirclePlus strokeWidth={1.5} />
            Добавить филиал
          </Button>
        </Link>
      </div>
      <Branches />
    </Container>
  );
}
