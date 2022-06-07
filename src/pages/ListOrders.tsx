import { FC, useState, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { CustomerType, Order } from "../services/shopify/types";
import { getShopName } from "../utils";
import { OrderInfo } from "../components/common";

export const ListOrders: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useEffect(() => {
        client?.setTitle(
            `Orders ${customer?.numberOfOrders ? `(${customer?.numberOfOrders})` : ''}`
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
    }, [client, customer?.numberOfOrders]);

    useEffect(() => {
        if (!client) {
            return;
        }

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                const { orders } = customer;

                setCustomer(customer);
                setOrders(orders);
            })
            .catch((error: Error) => dispatch({ type: "error", error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    const onChangePageOrder = (orderId: Order['id']) => {
        dispatch({ type: "changePage", page: "view_order", params: { orderId } })
    };

    return (
        <>
            {(orders || []).map((order) => (
                <OrderInfo
                    {...order}
                    key={order.id}
                    linkOrder={
                        `https://${getShopName(state)}.myshopify.com/admin/orders/${order.legacyResourceId}`
                    }
                    onChangePage={onChangePageOrder}
                />
            ))}
        </>
    );
};
