import { useCallback } from "react";
import size from "lodash/size";
import isEmpty from "lodash/isEmpty";
import { Title, Link } from "@deskpro/app-sdk";
import { OrderInfo, NoFound, ShopifyLogo } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Order } from "../../../services/shopify/types";

export type Props = {
  link: string,
  orders: Order[],
  onNavigateToOrders: () => void,
  onNavigateToOrder: (orderId: Order['id']) => void,
};

const Orders: FC<Props> = ({
    link,
    orders,
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
        link={link}
        icon={<ShopifyLogo/>}
      />
      {(isEmpty(orders) || !size(orders))
        ? (<NoFound/>)
        : orders.map(({ id, legacyResourceId,...order }) => (
          <OrderInfo
            {...order}
            key={id}
            id={id}
            legacyResourceId={legacyResourceId}
            linkOrder={`${link}/${legacyResourceId}`}
            onChangePage={onNavigateToOrder}
          />
        ))
      }
    </>
  );
}

export { Orders };
