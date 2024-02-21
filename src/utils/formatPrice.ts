type Options = {
  currency?: string,
  style?:
    | "decimal"   // for plain number formatting
    | "currency"  // for currency formatting
    | "percent"   // for percent formatting
    | "unit"      // for unit formatting
};

const formatPrice = (price?: string|number, options?: Options): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: options?.style || "currency",
    currency: options?.currency || "GBP",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(price || 0));
};

export { formatPrice };
