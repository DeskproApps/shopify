import { FC, useState, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getOrder } from "../services/shopify";
import { Order } from "../services/shopify/types";
import { EditOrderForm } from "../components/EditOrder";
import { Loading } from "../components/common";

export const EditOrder: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
    }, [client]);

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
                setLoading(false);
                client?.setTitle(`Edit Order #${order.legacyResourceId}`);
                setOrder(order);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state?.pageParams?.orderId]);

    return (loading || !order)
        ? (<Loading />)
        : (<EditOrderForm {...order as Order} />);
};
