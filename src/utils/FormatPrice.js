export const formatNpr = (value) => {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
  }).format(value);
};
