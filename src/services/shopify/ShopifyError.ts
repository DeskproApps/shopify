import type { ShopifyGraphQLError } from "./types";

export type InitData = {
  status: number,
  data: ShopifyGraphQLError,
};

class ShopifyError extends Error {
  status: number;
  data: ShopifyGraphQLError;

  constructor({ status, data }: InitData) {
    const message = "Shopify Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { ShopifyError };
