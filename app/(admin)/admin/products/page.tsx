import { Container, Title } from "@/shared/components";
import { ProductsTable } from "@/shared/components/admin/products/ProductsTable";
import { Button } from "@/shared/components/ui";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminProductsPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between w-full">
        <Title text="Товары" className="font-semibold" />
        <Link href="/admin/products/add">
          <Button variant="white_accent" className="flex items-center gap-2">
            <CirclePlus strokeWidth={1.5} />
            Добавить товар
          </Button>
        </Link>
      </div>
      <div className="mt-4 max-w-[100vw]">
        <ProductsTable />
      </div>
    </Container>
  );
}
