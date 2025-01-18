export const getProductFormData = (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File;
  const branches = formData.get("branches") as string;
  const categoryName = formData.get("category") as string;
  const subCategoryName = formData.get("subCategory") as string;

  const branchesArray = JSON.parse(branches);

  return {
    name,
    description,
    price,
    image,
    branches: branchesArray,
    categoryName,
    subCategoryName,
  };
};
