import isEmpty from "lodash/isEmpty";
import {
  HorizontalDivider,
} from "@deskpro/app-sdk";
import { isLast } from "../../utils";
import { Container } from "../common";
import { OrderItem, TotalPrice, Information } from "./block";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Order } from "../../services/shopify/types";

type Props = {
  order: Maybe<Order>,
};

const ViewOrder: FC<Props> = ({ order }) => {
  if (!order || isEmpty(order)) {
    return <></>
  }

  return (
    <>
      <Container>
        {order.lineItems.map((item, idx) => (
          <OrderItem
            key={order.id}
            item={item}
            isLast={isLast(order.lineItems, idx)}
          />
        ))}
      </Container>

      <HorizontalDivider style={{ marginBottom: 10 }}/>

      <Container>
        <TotalPrice {...order} />
      </Container>

      <HorizontalDivider style={{ marginBottom: 10 }}/>

      <Container>
        <Information {...order} />
      </Container>
    </>
  );
};

export { ViewOrder };
