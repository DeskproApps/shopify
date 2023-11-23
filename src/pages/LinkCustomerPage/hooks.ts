import get from "lodash/get";
import size from "lodash/size";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getCustomers } from "../../services/shopify";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { CustomerType } from "../../services/shopify/types";

type UseSearch = (q?: Maybe<string>) => {
  isLoading: boolean,
  customers: CustomerType[],
};

const useSearch: UseSearch = (q) => {
  const customers = useQueryWithClient(
    [QueryKey.CUSTOMERS, q as string],
    (client) => getCustomers(client, { querySearch: q as string }),
    { enabled: Boolean(q) && size(q) > 0 },
  );

  return {
    isLoading: customers.isLoading && Boolean(q),
    customers: get(customers, ["data", "customers"]) || [],
  };
};

export { useSearch };
