function formatPriceToUSD(num: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
}

export function toUSDField(num: any) {
  if (!Boolean(num) && typeof num !== "number") {
    return "-";
  }
  return formatPriceToUSD(num);
}
