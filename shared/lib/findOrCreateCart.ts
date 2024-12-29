import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string, userId?: number) => {
  let userCart = await prisma.cart.findFirst({
    where: { OR: [{ userId }, { token }] },
  });
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
        userId,
      },
    });
  }

  return userCart;
};
