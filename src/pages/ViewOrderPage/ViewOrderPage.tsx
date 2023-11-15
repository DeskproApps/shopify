import { FC, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { getOrder } from "../../services/shopify";
import { Order } from "../../services/shopify/types";
import { getShopName } from "../../utils";
import { ViewOrder } from "../../components";

const ViewOrderPage: FC = () => {
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
            .then(({ order }) => setOrder(order))
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, orderId]);

    useSetTitle(order?.legacyResourceId ? `#${order?.legacyResourceId}` : "Shopify");

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
        registerElement("refresh", { type: "refresh_button" });
        registerElement("menu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", path: "/list_orders" },
            }],
        });
        if (shopName && order?.legacyResourceId) {
            registerElement("external", {
                type: "cta_external_link",
                url: `https://${shopName}.myshopify.com/admin/orders/${order.legacyResourceId}`,
                hasIcon: true,
            });
        }
        if (orderId) {
            registerElement("edit", {
                type: "edit_button",
                payload: {
                    type: "changePage",
                    path: { pathname: `/edit_order`, search: `?orderId=${orderId}` }
                },
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, orderId]);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
      <ViewOrder order={order}/>
    );
};

export { ViewOrderPage };
