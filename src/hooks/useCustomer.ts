import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getCustomer } from "../services/shopify";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { CustomerType } from "../services/shopify/types";

type UseCustomer = (customerId: Maybe<CustomerType["id"]>) => {
  isLoading: boolean,
  customer: CustomerType,
};

const useCustomer: UseCustomer = (customerId) => {
  const customer = useQueryWithClient(
    [QueryKey.CUSTOMER, customerId as CustomerType["id"]],
    (client) => getCustomer(client, customerId as CustomerType["id"]),
    { enabled: Boolean(customerId) },
  );

  return {
    isLoading: [customer].some(({ isLoading }) => isLoading),
    customer: get(customer, ["data", "customer"]) as CustomerType,
  };
};

export { useCustomer };
