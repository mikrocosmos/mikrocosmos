export interface CartItemProps {
  id: number;
  imageUrl: string;
  description: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  disabled?: boolean;
}
