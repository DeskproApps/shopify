import { useMemo, useCallback } from "react";
import get from "lodash/get";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import type { Maybe } from "../types";
import type { CustomerType, Order } from "../services/shopify/types";

type UseExternalLink = () => {
  getCustomerLink: (id: CustomerType["legacyResourceId"]) => Maybe<string>,
  getOrdersLink: () => Maybe<string>,
  getOrderLink: (id: Order["legacyResourceId"]) => Maybe<string>,
};

const useExternalLink: UseExternalLink = () => {
  const { context } = useDeskproLatestAppContext();
  const shopName = useMemo(() => get(context, ["settings", "shop_name"]), [context]);

  const getCustomerLink = useCallback((id: CustomerType["legacyResourceId"]) => {
    if (!shopName || !id) {
      return;
    }

    return `https://${shopName}.myshopify.com/admin/customers/${id}`;
  }, [shopName]);

  const getOrdersLink = useCallback(() => {
    if (!shopName) {
      return;
    }

    return `https://${shopName}.myshopify.com/admin/orders`;
  }, [shopName]);

  const getOrderLink = useCallback((id: Order["legacyResourceId"]) => {
    if (!shopName || !id) {
      return;
    }

    return `${getOrdersLink()}/${id}`;
  }, [shopName, getOrdersLink]);

  return { getCustomerLink, getOrdersLink, getOrderLink };
};

export { useExternalLink };
