import get from "lodash/get";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { getShopName } from "../../utils";
import { Container } from "../common";
import { CustomerInfo, Orders, Comments } from "./block";
import type { FC } from "react";
import type { State } from "../../context/StoreProvider/types";
import type { CustomerType, Order } from "../../services/shopify/types";

type Props = {
  state: State,
  orders: Order[],
  customer: CustomerType;
  onNavigateToCustomer: (customerId: CustomerType["id"]) => void,
  onNavigateToOrders: () => void,
  onNavigateToOrder: (orderId: Order['id']) => void,
};

const Home: FC<Props> = ({
  state,
  orders,
  customer,
  onNavigateToCustomer,
  onNavigateToOrders,
  onNavigateToOrder,
}) => {
  return (
    <>
      <Container>
        <CustomerInfo
          customer={customer}
          link={`https://${getShopName(state)}.myshopify.com/admin/customers/${customer.legacyResourceId}`}
          onNavigateToCustomer={onNavigateToCustomer}
        />
      </Container>

      <HorizontalDivider style={{ marginBottom: 10 }}/>

      <Container>
        <Orders
          orders={orders}
          link={`https://${getShopName(state)}.myshopify.com/admin/orders`}
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
