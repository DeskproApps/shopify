import { FC, useState, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getOrder } from "../services/shopify";
import { Order } from "../services/shopify/types";
import { getShopName } from "../utils";
import { OrderItem, TotalPrice, Information } from "../components/ViewOrder";

export const ViewOrder: FC = () => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();
    const [order, setOrder] = useState<null | Order>(null);
    const shopName = getShopName(state);

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
        client?.deregisterElement("shopifyExternalCtaLink");


        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        client?.registerElement("shopifyMenu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", page: "list_orders" },
            }/*, {
                title: "Settings",
                payload: "settings",
            }*/],
        });
        if (shopName && order?.legacyResourceId) {
            client?.registerElement("shopifyExternalCtaLink", {
                type: "cta_external_link",
                url: `https://${shopName}.myshopify.com/admin/orders/${order.legacyResourceId}`,
                hasIcon: true,
            });
        }
        if (state?.pageParams?.orderId) {
            client?.registerElement("shopifyEditButton", {
                type: "edit_button",
                payload: {
                    type: "changePage",
                    page: "edit_order",
                    params: { orderId: state.pageParams.orderId }
                },
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state?.pageParams?.orderId]);

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
