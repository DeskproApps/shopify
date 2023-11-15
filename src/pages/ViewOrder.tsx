import { FC, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId") as Order["id"];
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<null | Order>(null);
    const shopName = getShopName(state);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!orderId) {
            dispatch({ type: "error", error: "OrderId not found" });
            return;
        }

        getOrder(client, orderId)
            .then(({ order }) => {
                client?.setTitle(`#${order?.legacyResourceId}`);
                setOrder(order);
            })
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, orderId]);

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");
        client?.deregisterElement("shopifyExternalCtaLink");


        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        client?.registerElement("shopifyMenu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", path: "/list_orders" },
            }],
        });
        if (shopName && order?.legacyResourceId) {
            client?.registerElement("shopifyExternalCtaLink", {
                type: "cta_external_link",
                url: `https://${shopName}.myshopify.com/admin/orders/${order.legacyResourceId}`,
                hasIcon: true,
            });
        }
        if (orderId) {
            client?.registerElement("shopifyEditButton", {
                type: "edit_button",
                payload: {
                    type: "changePage",
                    path: {
                      pathname: `/edit_order`,
                      search: `?orderId=${orderId}`,
                    }
                },
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, orderId]);

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
