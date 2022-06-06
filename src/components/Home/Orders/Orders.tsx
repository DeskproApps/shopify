import { FC } from "react";
import { OrderInfo, SubHeader } from "../../common";
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
        {orders.map(({ id, legacyResourceId,...order }) => (
            <OrderInfo
                {...order}
                key={id}
                id={id}
                legacyResourceId={legacyResourceId}
                linkOrder={`${link}/${legacyResourceId}`}
                onChangePage={onChangePageOrder}
            />
        ))}
    </>
);

export { Orders };
