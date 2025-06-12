export function formatPrice(price: number) {
  return Number(price).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
}