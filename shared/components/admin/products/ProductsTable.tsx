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
import { ProductWithSubCategory } from "@/@types/prisma";
import { getProducts } from "@/app/actions/admin.products.actions";
import { Skeleton } from "@/shared/components/ui";
import { ProductsSearch } from "@/shared/components/admin/products/ProductsSearch";
import { useAdminProductSearchStore } from "@/shared/store";
import { CategoryFilter } from "@/shared/components/admin/products/CategoryFilter";
import { ProductsTableRow } from "@/shared/components/admin/products/ProductsTableRow";

interface Props {
  className?: string;
}

type SortArgument = string | boolean | number | Date | null;

export const ProductsTable: React.FC<Props> = ({ className }) => {
  const { search, updateSearch } = useAdminProductSearchStore((state) => state);
  const [products, setProducts] = React.useState<ProductWithSubCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
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
        return product.vary.subCategory.category.name === value;
      }),
    );
  };

  const onChangeSubCategoryFilter = (value: string) => {
    setFilteredProducts(
      products.filter((product) => {
        if (value === "Все") {
          return true;
        }
        return product.vary.subCategory.name === value;
      }),
    );
  };

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortProducts(a.name, b.name, order);
      case "category":
        return sortProducts(
          a.vary.subCategory.category.name,
          b.vary.subCategory.category.name,
          order,
        );
      case "subCategory":
        return sortProducts(
          a.vary.subCategory.name,
          b.vary.subCategory.name,
          order,
        );
      case "vary":
        return sortProducts(a.vary.name, b.vary.name, order);
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
      <div className="adaptive items-center justify-between">
        <CategoryFilter onChangeCategoryFilter={onChangeCategoryFilter} />
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
                  text="Подкатегория"
                  sortByValue="subCategory"
                />
              </TableHead>
              <TableHead className="text-white">
                <SortTableHead
                  order={order}
                  setOrder={setOrder}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  text="Вариация"
                  sortByValue="vary"
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
              <ProductsTableRow product={product} key={product.id} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
