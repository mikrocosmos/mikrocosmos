import { CartItem, Container, Title } from "@/shared/components";
import { Button } from "@/shared/components/ui";

export default async function CartPage() {
  return (
    <Container className="min-h-[85vh] max-w-[700px] flex flex-col justify-between items-center py-5">
      <Title text="Корзина покупок" size="xl" className="font-bold" />
      <div className="pt-5 w-full flex-1">
        <CartItem />
        <CartItem />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between gap-5">
          <Title text="Итого:" size="lg" className="font-semibold" />
          <p className="font-bold text-primary text-2xl">2 480 ₽</p>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <Button variant="outline_red" className="w-full">
            Очистить корзину
          </Button>
          <Button variant="white_accent" className="w-full">
            Оформить заказ
          </Button>
        </div>
      </div>
    </Container>
  );
}
