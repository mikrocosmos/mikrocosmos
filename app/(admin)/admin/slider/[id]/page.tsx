import { checkAdmin } from "@/shared/lib/checkAdmin";
import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { EditSlideForm } from "@/shared/components/admin/slider/EditSlideForm";

export default async function AdminSlidePage({
  params,
}: {
  params: { id: string };
}) {
  await checkAdmin();

  const slide = await prisma.heroSlide.findFirst({
    where: { id: Number(params.id) },
  });

  if (!slide) return redirect("/404");
  return (
    <Container className="admin-page">
      <Title text={slide.heading} className="font-semibold" />
      <EditSlideForm slide={slide} />
    </Container>
  );
}
