export const getSlideFormData = (formData: FormData) => {
  const heading = formData.get("heading") as string;
  const text = formData.get("text") as string;
  const link = formData.get("link") as string;
  const image = formData.get("image") as File;
  const btnText = formData.get("btnText") as string;

  return {
    heading,
    text,
    link,
    image,
    btnText,
  };
};
