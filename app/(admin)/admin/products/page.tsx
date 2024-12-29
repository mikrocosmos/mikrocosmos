import { Container, Title } from "@/shared/components";
import { ProductsTable } from "@/shared/components/admin/products/ProductsTable";
import { Button } from "@/shared/components/ui";
import { CirclePlus } from "lucide-react";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminProductsPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }
  return (
    <Container className="admin-page w-[75vw]">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title text="Товары" className="font-semibold" />
        <Link href="/admin/products/add">
          <Button variant="white_accent" className="flex items-center gap-2">
            <CirclePlus strokeWidth={1.5} />
            Добавить товар
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <ProductsTable />
      </div>
    </Container>
  );
}
