import { FC, useState, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getOrder } from "../services/shopify";
import { Order } from "../services/shopify/types";
import { OrderItem, TotalPrice, Information } from "../components/ViewOrder";

export const ViewOrder: FC = () => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();
    const [order, setOrder] = useState<null | Order>(null);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!state?.pageParams?.orderId) {
            return;
        }

        getOrder(client, state?.pageParams?.orderId)
            .then(({ order }) => {
                client?.setTitle(`#${order?.legacyResourceId}`);
                setOrder(order);
            });
    }, [client, state?.pageParams?.orderId]);

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        /* ToDo: uncomment when create edit order
        client?.registerElement("shopifyEditButton", {
            type: "edit_button",
            payload: { type: "changePage", page: "edit_order" },
        });*/
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        client?.registerElement("shopifyMenu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", page: "list_orders" },
            }, {
                title: "Settings",
                payload: "settings",
            }],
        });
    }, [client, state]);

    return !order
        ? (<>Loading...</>)
        : (
            <>
                {order.lineItems.map((item) => (
                    <OrderItem key={item.id} {...item} />
                ))}
                <TotalPrice {...order} />
                <Information {...order} />
            </>
        );
};
