import { FC } from "react";
import isEmpty from "lodash/isEmpty";
import { OrderInfo, SubHeader, NoFound } from "../../common";
import { Props } from "./types";

const Orders: FC<Props> = ({
    link,
    orders,
    onChangePage,
    onChangePageOrder,
    numberOfOrders,
}) => (
    <>
        <SubHeader
            marginBottom={14}
            text={`Orders ${numberOfOrders ? `(${numberOfOrders})` : ''}`}
            link={link}
            onChangePage={onChangePage}
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

export { Orders };
