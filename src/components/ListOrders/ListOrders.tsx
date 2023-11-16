import size from "lodash/size";
import { NoFound, OrderInfo, Container } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Order } from "../../services/shopify/types";

type Props = {
  orders: Order[],
  getOrderLink: (id: Order["legacyResourceId"]) => Maybe<string>,
  onNavigateToOrder: (orderId: Order['id']) => void,
};

const ListOrders: FC<Props> = ({ orders, onNavigateToOrder, getOrderLink }) => {
  return (
    <Container>
      {(!Array.isArray(orders) || !size(orders))
        ? (<NoFound />)
        : orders.map((order) => (
          <OrderInfo
            {...order}
            key={order.id}
            linkOrder={getOrderLink(order.legacyResourceId)}
            onChangePage={onNavigateToOrder}
          />
        ))}
    </Container>
  );
};

export { ListOrders };
