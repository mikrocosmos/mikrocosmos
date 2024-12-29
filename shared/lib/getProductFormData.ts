export const getProductFormData = (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File;
  const branchIds = formData.get("branchIds") as string;
  const categoryName = formData.get("category") as string;

  const branchIdsArray = branchIds
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(Number);

  return {
    name,
    description,
    price,
    image,
    branchIds: branchIdsArray,
    categoryName,
  };
};
