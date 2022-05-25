import { FC, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { OrderInfo } from "../components/common";

const orders = [
    { id: "1", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
    { id: "2", orderName: "Television", date: "17 May, 2020", status: "fulfilled" },
    { id: "3", orderName: "John Lewis & Partners Puppytooty & many many more", date: "17 May, 2020", status: "onHold" },
    { id: "4", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
    { id: "5", orderName: "Oven", date: "17 May, 2020", status: "unfulfilled" },
    { id: "6", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
    { id: "7", orderName: "Television", date: "17 May, 2020", status: "fulfilled" },
    { id: "8", orderName: "John Lewis & Partners Puppytooty & many many more", date: "17 May, 2020", status: "onHold" },
    { id: "9", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
];

export const ListOrders: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();

    useEffect(() => {
        client?.setTitle(`Orders (${orders.length})`);
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
    }, [client, state]);

    return (
        <>
            {orders.map((order) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                <OrderInfo
                    {...order}
                    key={order.id}
                    onChangePage={() => dispatch({ type: "changePage", page: "view_order" })}
                />
            ))}
        </>
    );
};
