import { FC, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getOrders } from "../services/shopify";
import { getShopName } from "../utils";
import { OrderInfo } from "../components/common";

export const ListOrders: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useEffect(() => {
        client?.setTitle(
            `Orders ${state.customer?.orders_count ? `(${state.customer?.orders_count})` : ''}`
        );

        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
    }, [client, state]);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!state.orders) {
            getEntityCustomerList(client, userId)
                .then((customers: string[]) => {
                    return getOrders(client, customers[0]);
                })
                .then(({ orders }) => dispatch({ type: "linkedOrders", orders }))
                .catch((error: Error) => dispatch({ type: "error", error }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    const onChangePageOrder = (orderId: number) => {
        dispatch({ type: "changePage", page: "view_order", params: { orderId } })
    };

    return (
        <>
            {(state?.orders || []).map((order) => (
                <OrderInfo
                    {...order}
                    key={order.id}
                    linkOrder={
                        `https://${getShopName(state)}.myshopify.com/admin/orders/${order.id}`
                    }
                    onChangePage={onChangePageOrder}
                />
            ))}
        </>
    );
};
