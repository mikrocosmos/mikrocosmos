import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";

export const checkAdmin = async (allowCashiers?: boolean) => {
  const session = await getUserSession();

  if (session && session.role === "USER") {
    return redirect("/404");
  }

  if (session && session.role === "CASHIER" && !allowCashiers) {
    return redirect("/404");
  }

  return session;
};
