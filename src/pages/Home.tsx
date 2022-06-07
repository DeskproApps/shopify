import { FC, useState, useEffect } from "react";
import {
    useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { CustomerInfo, Orders, Comments } from "../components/Home";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { getShopName } from "../utils";
import { CustomerType, Order } from "../services/shopify/types";

export const Home: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useEffect(() => {
        client?.setTitle("Shopify Customer");

        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        client?.registerElement("shopifyMenu", {
            type: "menu",
            items: [{
                title: "Change Linked Customer",
                payload: { type: "changePage", page: "link_customer" },
            }, {
                title: "Settings",
                payload: "settings",
            }],
        });
    }, [client, state])

    const onChangePageOrder = (orderId: Order['legacyResourceId']) => {
        dispatch({ type: "changePage", page: "view_order", params: { orderId } })
    };

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

    return !customer
        ? state._error ? null : <>Loading...</>
        : (
            <>
                {customer && (
                    <CustomerInfo
                        {...customer}
                        link={`https://${getShopName(state)}.myshopify.com/admin/customers/${customer.legacyResourceId}`}
                        onChangePage={() => dispatch({ type: "changePage", page: "view_customer" })}
                    />
                )}
                {orders && (
                    <Orders
                        numberOfOrders={customer?.numberOfOrders || '0'}
                        orders={orders}
                        link={`https://${getShopName(state)}.myshopify.com/admin/orders`}
                        onChangePage={() => dispatch({ type: "changePage", page: "list_orders" })}
                        onChangePageOrder={onChangePageOrder}
                    />
                )}
                {customer?.comments && (
                    <Comments comments={customer.comments} />
                )}
            </>
        );
};
