import { CartDTO } from "@/shared/services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  productId: number;
  disabled: boolean;
  branchIds: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalPrice: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.product.name,
    imageUrl: item.product.imageUrl,
    price: item.product.price * item.quantity,
    description: item.product.description,
    productId: item.product.id,
    disabled: false,
  })) as unknown as CartStateItem[];
  return {
    items,
    totalPrice: data.totalPrice,
  };
};
