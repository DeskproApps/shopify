import { FC, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getOrder } from "../services/shopify";
import { Order } from "../services/shopify/types";
import { getShopName } from "../utils";
import { Loading } from "../components/common";
import { OrderItem, TotalPrice, Information } from "../components/ViewOrder";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ViewOrder: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<null | Order>(null);
    const shopName = getShopName(state);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!state?.pageParams?.orderId) {
            dispatch({ type: "error", error: "OrderId not found" });
            return;
        }

        getOrder(client, state.pageParams.orderId)
            .then(({ order }) => {
                client?.setTitle(`#${order?.legacyResourceId}`);
                setOrder(order);
            })
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (loading) {
        return (
            <Loading />
        );
    }

    return (order && !isEmpty(order)) && (
            <>
                {order.lineItems.map((item) => (
                    <OrderItem key={item.id} {...item} />
                ))}
                <TotalPrice {...order} />
                <Information {...order} />
            </>
        );
};
