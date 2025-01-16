import { useQueryWithClient } from "@deskpro/app-sdk";
import { getOrder } from "../services/shopify";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Order } from "../services/shopify/types";

type UseOrder = (orderId: Maybe<Order["id"]>) => {
  isLoading: boolean,
  order?: Order,
};

const useOrder: UseOrder = (orderId) => {
  const order = useQueryWithClient(
    [QueryKey.ORDER, orderId as Order["id"]],
    (client) => getOrder(client, orderId as Order["id"]),
    { enabled: Boolean(orderId) },
  );

  return {
    isLoading: false,
    order: order.data?.order,
  };
};

export { useOrder };
