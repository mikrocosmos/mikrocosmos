import { prisma } from "@/prisma/prisma-client";

/**
 * Updates the total price of a user's cart and returns it.
 *
 * @param {string} token - The token of the user's cart.
 * @return {Promise<number>} The updated total price of the user's cart.
 */
export const updateCartTotal = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: true,
        },
      },
    },
  });

  if (!userCart) return 0;

  const totalPrice = userCart?.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return prisma.cart.update({
    where: { id: userCart.id },
    data: { totalPrice },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: true,
        },
      },
    },
  });
};
