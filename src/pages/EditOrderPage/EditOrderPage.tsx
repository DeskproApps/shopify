import { FC, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { getOrder } from "../../services/shopify";
import { Order } from "../../services/shopify/types";
import { EditOrderForm } from "../../components/EditOrder";

const EditOrderPage: FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId") as Order["id"];
    const { client } = useDeskproAppClient();
    const [, dispatch] = useStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useSetTitle("Edit Order");

    useRegisterElements(({ registerElement }) => {
        registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    });

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
        ? (<LoadingSpinner />)
        : (<EditOrderForm {...order as Order} />);
};

export { EditOrderPage };
