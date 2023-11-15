import { FC, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getOrder } from "../services/shopify";
import { Order } from "../services/shopify/types";
import { EditOrderForm } from "../components/EditOrder";
import { Loading } from "../components/common";

export const EditOrder: FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId") as Order["id"];
    const { client } = useDeskproAppClient();
    const [, dispatch] = useStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    }, [client]);

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
                setLoading(false);
                client?.setTitle(`Edit Order #${order.legacyResourceId}`);
                setOrder(order);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, orderId]);

    return (loading || !order)
        ? (<Loading />)
        : (<EditOrderForm {...order as Order} />);
};
