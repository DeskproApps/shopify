import { useCallback } from "react";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import { Title, Link } from "@deskpro/app-sdk";
import { isLast } from "../../../utils";
import { OrderInfo, NoFound, ShopifyLogo } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Maybe } from "../../../types";
import type { Order } from "../../../services/shopify/types";

export type Props = {
  link: Maybe<string>,
  orders: Order[],
  onNavigateToOrders: () => void,
  onNavigateToOrder: (orderId: Order['id']) => void,
  getOrderLink: (id: Order["legacyResourceId"]) => Maybe<string>,
};

const Orders: FC<Props> = ({
    link,
    orders,
    getOrderLink,
    onNavigateToOrder,
    onNavigateToOrders,
}) => {
  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onNavigateToOrders && onNavigateToOrders();
  }, [onNavigateToOrders]);

  return (
    <>
      <Title
        title={(
          <Link href="#" onClick={onClick}>
            {`Orders (${size(orders)})`}
          </Link>
        )}
        {...(!link ? {} : { link })}
        {...(!link ? {} : { icon: <ShopifyLogo/> })}
      />
      {(isEmpty(orders) || !size(orders))
        ? (<NoFound/>)
        : orders.map(({ id, legacyResourceId,...order }, idx) => (
          <OrderInfo
            {...order}
            key={id}
            id={id}
            isLast={isLast(orders, idx)}
            legacyResourceId={legacyResourceId}
            linkOrder={getOrderLink(legacyResourceId)}
            onChangePage={onNavigateToOrder}
          />
        ))
      }
    </>
  );
}

export { Orders };
