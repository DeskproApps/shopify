import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Orders, Comments } from "./block";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { CustomerType, Order } from "../../services/shopify/types";

type Props = {
  orders: Order[],
  customer: CustomerType,
  onNavigateToCustomer: (customerId: CustomerType["id"]) => void,
  onNavigateToOrders: () => void,
  onNavigateToOrder: (orderId: Order['id']) => void,
  getOrdersLink: () => Maybe<string>,
  getCustomerLink: (id: CustomerType["legacyResourceId"]) => Maybe<string>,
  getOrderLink: (id: Order["legacyResourceId"]) => Maybe<string>,
};

const Home: FC<Props> = ({
  orders,
  customer,
  onNavigateToOrders,
  onNavigateToOrder,
  getOrderLink,
  getOrdersLink,
}) => {
  return (
    <>
      <Container>
        <Orders
          orders={orders}
          link={getOrdersLink()}
          getOrderLink={getOrderLink}
          onNavigateToOrder={onNavigateToOrder}
          onNavigateToOrders={onNavigateToOrders}
        />
      </Container>

      <HorizontalDivider style={{ marginBottom: 10 }}/>

      <Container>
        <Comments comments={get(customer, ["comments"], []) || []} />
      </Container>
    </>
  );
};

export { Home };
