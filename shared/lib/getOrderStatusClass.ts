export const getOrderStatusClass = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "COMPLETED":
      return "bg-success text-green-900";
    case "CANCELED":
      return "bg-destructive text-red-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
