"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { SortTableHead } from "@/shared/components/admin/SortTableHead";
import { useCategories } from "@/shared/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { ProductWithCategory } from "@/@types/prisma";
import { getProducts } from "@/app/actions/admin.products.actions";
import { Skeleton } from "@/shared/components/ui";
import { ProductsSearch } from "@/shared/components/admin/products/ProductsSearch";
import { useAdminProductSearchStore } from "@/shared/store";

interface Props {
  className?: string;
}

type SortArgument = string | boolean | number | Date | null;

export const ProductsTable: React.FC<Props> = ({ className }) => {
  const { search, updateSearch } = useAdminProductSearchStore((state) => state);
  const [products, setProducts] = React.useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { categories } = useCategories();
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = React.useState("date");

  const sortProducts = (
    a: SortArgument,
    b: SortArgument,
    order: "asc" | "desc" = "asc",
  ) => {
    if (order === "asc") {
      return a! < b! ? -1 : 1;
    } else {
      return a! > b! ? -1 : 1;
    }
  };

  const onChangeCategoryFilter = (value: string) => {
    setFilteredProducts(
      products.filter((product) => {
        if (value === "Все") {
          return true;
        }
        return product.category.name === value;
      }),
    );
  };

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortProducts(a.name, b.name, order);
      case "category":
        return sortProducts(a.category.name, b.category.name, order);
      case "price":
        return sortProducts(a.price, b.price, order);
      case "id":
        return sortProducts(a.id, b.id, order);
      default:
        return sortProducts(a.createdAt, b.createdAt, order);
    }
  });

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(search ? search : undefined);
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, [search]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts();
    updateSearch("");
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Select
          onValueChange={(value) => {
            onChangeCategoryFilter(value);
          }}
        >
          <SelectTrigger className={cn("my-4 w-[250px]", className)}>
            <SelectValue placeholder="Фильтр по категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Все">Все</SelectItem>
            {Array.from(
              categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              )),
            )}
          </SelectContent>
        </Select>
        <ProductsSearch />
      </div>
      {loading ? (
        <Skeleton className="w-full h-96" />
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Изображение</TableHead>
              <TableHead className="text-white">
                <SortTableHead
                  order={order}
                  setOrder={setOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  text="ID"
                  sortByValue="id"
                />
              </TableHead>
              <TableHead className="text-white">
                <SortTableHead
                  order={order}
                  setOrder={setOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  text="Название"
                  sortByValue="name"
                />
              </TableHead>
              <TableHead className="text-white">
                <SortTableHead
                  order={order}
                  setOrder={setOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  text="Категория"
                  sortByValue="category"
                />
              </TableHead>
              <TableHead className="text-white">
                <SortTableHead
                  order={order}
                  setOrder={setOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  text="Цена"
                  sortByValue="price"
                />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link href={`/product/${product.id}`}>
                    <Image
                      className="rounded-3xl shadow-lg border-2 border-gray-200 object-cover md:w-[150px] w-full h-[150px] bg-white transition hover:border-primary"
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </Link>
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Link
                    className="transition hover:text-primary"
                    href={`/admin/categories/${product.category.id}`}
                  >
                    {product.category.name}
                  </Link>
                </TableCell>
                <TableCell>{product.price} ₽</TableCell>
                <TableCell>
                  <Link
                    className="transition hover:text-primary flex items-center gap-1"
                    href={`/admin/products/${product.id}`}
                  >
                    <Pencil size={16} />
                    Редактировать
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
