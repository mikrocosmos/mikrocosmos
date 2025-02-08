import React from "react";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { ProductWithSubCategory } from "@/@types/prisma";

interface Props {
  product: ProductWithSubCategory;
  className?: string;
}

export const ProductsTableRow: React.FC<Props> = ({ className, product }) => {
  return (
    <TableRow key={product.id}>
      <TableCell>
        <Link href={`/product/${product.id}`}>
          <Image
            className="rounded-3xl shadow-lg border-2 border-gray-200 object-cover md:w-[150px] w-full h-[150px] bg-white transition hover:border-primary"
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
          />
        </Link>
      </TableCell>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <Link
          className="transition hover:text-primary"
          href={`/admin/categories/${product.vary.subCategory.category.id}`}
        >
          {product.vary.subCategory.category.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          className="transition hover:text-primary"
          href={`/admin/subcategory/${product.vary.subCategory.id}`}
        >
          {product.vary.subCategory.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          className="transition hover:text-primary"
          href={`/admin/vary/${product.vary.id}`}
        >
          {product.vary.name}
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
  );
};
