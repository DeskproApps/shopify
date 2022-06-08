import { FC } from "react";
import isEmpty from "lodash/isEmpty";
import { HorizontalDivider } from "@deskpro/app-sdk";
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
        {isEmpty(orders)
            ? <HorizontalDivider style={{ marginBottom: 9 }}/>
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
