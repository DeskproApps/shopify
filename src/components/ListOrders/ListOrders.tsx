import size from "lodash/size";
import { getShopName } from "../../utils";
import { NoFound, OrderInfo, Container } from "../common";
import type { FC } from "react";
import type { State } from "../../context/StoreProvider/types";
import type { Order } from "../../services/shopify/types";

type Props = {
  state: State,
  orders: Order[],
  onNavigateToOrder: (orderId: Order['id']) => void,
};

const ListOrders: FC<Props> = ({ orders, onNavigateToOrder, state }) => {
  return (
    <Container>
      {(!Array.isArray(orders) || !size(orders))
        ? (<NoFound />)
        : orders.map((order) => (
          <OrderInfo
            {...order}
            key={order.id}
            linkOrder={
              `https://${getShopName(state)}.myshopify.com/admin/orders/${order.legacyResourceId}`
            }
            onChangePage={onNavigateToOrder}
          />
        ))}
    </Container>
  );
};

export { ListOrders };
