import { useCallback } from "react";
import isEmpty from "lodash/isEmpty";
import { Title, Link } from "@deskpro/app-sdk";
import { OrderInfo, NoFound, ShopifyLogo } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Props } from "./types";

const Orders: FC<Props> = ({
    link,
    orders,
    onChangePage,
    onChangePageOrder,
    numberOfOrders,
}) => {
  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onChangePage && onChangePage();
  }, [onChangePage]);

  return (
    <>
      <Title
        title={(
            <Link href="#" onClick={onClick}>
                {`Orders ${numberOfOrders ? `(${numberOfOrders})` : ''}`}
            </Link>
        )}
        link={link}
        icon={<ShopifyLogo/>}
      />
      {isEmpty(orders)
        ? (<NoFound/>)
        : orders.map(({ id, legacyResourceId,...order }) => (
          <OrderInfo
            {...order}
            key={id}
            id={id}
            legacyResourceId={legacyResourceId}
            linkOrder={`${link}/${legacyResourceId}`}
            onChangePage={onChangePageOrder}
          />
        ))
      }
    </>
  );
}

export { Orders };
