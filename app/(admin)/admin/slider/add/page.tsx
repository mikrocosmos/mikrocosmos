import { Container, Title } from "@/shared/components";
import { AddSlideForm } from "@/shared/components/admin/slider/AddSlideForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminSliderAddPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <Title text="Добавить слайд" className="font-semibold" />
      <AddSlideForm />
    </Container>
  );
}
