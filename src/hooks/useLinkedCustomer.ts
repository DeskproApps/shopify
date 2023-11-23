import { useMemo } from "react";
import get from "lodash/get";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityCustomerList } from "../services/deskpro";
import { useCustomer } from "./useCustomer";
import { QueryKey } from "../query";
import type { CustomerType, Order } from "../services/shopify/types";

type UseLinkedCustomer = () => {
  isLoading: boolean,
  customer: CustomerType,
  orders: Order[],
};

const useLinkedCustomer: UseLinkedCustomer = () => {
  const { context } = useDeskproLatestAppContext();
  const dpUserId = useMemo(() => {
    return get(context, ["data", "ticket", "primaryUser", "id"])
      || get(context, ["data", "user", "id"])
  }, [context]);

  const customerIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACTS, dpUserId],
    (client) => getEntityCustomerList(client, dpUserId),
    { enabled: Boolean(dpUserId) },
  );

  const customerId = useMemo(() => get(customerIds, ["data", 0]), [customerIds]);

  const customer = useCustomer(customerId);

  return {
    isLoading: [customerIds, customer].some(({ isLoading }) => isLoading),
    customer: get(customer, ["customer"]),
    orders: get(customer, ["customer", "orders"]) || [],
  };
};

export { useLinkedCustomer };
