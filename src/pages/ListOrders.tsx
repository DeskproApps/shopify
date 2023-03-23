import {FC, useState, useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { Order, CustomerType } from "../services/shopify/types";
import { getShopName } from "../utils";
import { OrderInfo, NoFound, Loading } from "../components/common";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ListOrders: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [loading, setLoading] = useState<boolean>(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
    }, [client]);

    useEffect(() => {
        client?.setTitle(
            `Orders ${customer?.numberOfOrders ? `(${customer?.numberOfOrders})` : ''}`
        );
    }, [client, customer?.numberOfOrders]);

    useEffect(() => {
        if (!client) {
            return;
        }

        setLoading(true);

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                const { orders } = customer;

                setCustomer(customer);
                setOrders(orders);
                setLoading(false);
            })
            .catch((error: Error) => {
                setLoading(false);
                dispatch({ type: "error", error: get(error, ["errors"], error) })
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    const onChangePageOrder = (orderId: Order['id']) => {
        dispatch({ type: "changePage", page: "view_order", params: { orderId } })
    };

    if (loading) {
        return (<Loading />);
    }

    return (!orders || isEmpty(orders))
        ? (<NoFound />)
        : orders.map((order) => (
            <OrderInfo
                {...order}
                key={order.id}
                linkOrder={
                    `https://${getShopName(state)}.myshopify.com/admin/orders/${order.legacyResourceId}`
                }
                onChangePage={onChangePageOrder}
            />
        ));
};
