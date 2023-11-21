/** Typo */
export const nbsp = "\u00A0";

/** Deskpro */
export const APP_PREFIX = "shopify";

export const ENTITY = 'linkedShopifyCustomers';

export const DEFAULT_ERROR = "There was an error!";

export const placeholders = {
  SHOP_NAME: "__shop_name__",
  ACCESS_TOKEN: "__access_token__",
};

export const GRAPHQL_URL = (shopName?: string) => `https://${shopName || placeholders.SHOP_NAME}.myshopify.com/admin/api/2023-10/graphql.json`;
