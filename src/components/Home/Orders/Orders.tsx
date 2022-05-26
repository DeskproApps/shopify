import { FC } from "react";
import { OrderInfo, SubHeader } from "../../common";
import { Props } from "./types";

const Orders: FC<Props> = ({ link, onChangePage, onChangePageOrder }) => {
    return (
        <>
            <SubHeader
                marginBottom={14}
                text="Orders (9)"
                link={link}
                onChangePage={onChangePage}
            />
            {[
                { id: "1", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
                { id: "2", orderName: "Television", date: "17 May, 2020", status: "fulfilled" },
                { id: "3", orderName: "John Lewis & Partners Puppytooty & many many more", date: "17 May, 2020", status: "onHold" },
                { id: "4", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
                { id: "5", orderName: "Oven", date: "17 May, 2020", status: "unfulfilled" },
            ].map((order) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                <OrderInfo key={order.id} onChangePage={onChangePageOrder} {...order} />
            ))}
        </>
    );
};

export { Orders };
