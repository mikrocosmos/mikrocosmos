import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

const [loading, addCartItem] = useCartStore((state) => [
  state.loading,
  state.addCartItem,
]);

const onSubmit = async (productId?: number, branchIds?: number[]) => {
  try {
    await addCartItem({
      productId,
      branchIds,
    });
    toast.success(`Товар добавлен в корзину`);
  } catch (error) {
    toast.error(`Не удалось добавить товар в корзину`);
    console.error(error);
  }
};
