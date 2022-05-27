import { FC } from "react";
import { OrderInfo, SubHeader } from "../../common";
import { Props } from "./types";

const Orders: FC<Props> = ({
    link,
    orders,
    onChangePage,
    onChangePageOrder,
    ordersCount,
}) => (
    <>
        <SubHeader
            marginBottom={14}
            text={`Orders ${ordersCount ? `(${ordersCount})` : ''}`}
            link={link}
            onChangePage={onChangePage}
        />
        {orders.map(({ id, ...order }) => (
            <OrderInfo
                {...order}
                key={id}
                id={id}
                linkOrder={`${link}/${id}`}
                onChangePage={onChangePageOrder}
            />
        ))}
    </>
);

export { Orders };
