import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

const useAddToCart = async (productId?: number, branchIds?: number[]) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  try {
    await addCartItem({
      productId,
      branchIds,
    });
    toast(`Товар добавлен в корзину`);
  } catch (error) {
    toast(`Не удалось добавить товар в корзину`);
    console.error(error);
  }
};
