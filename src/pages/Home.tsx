import { FC, useEffect } from "react";
import {
    useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { CustomerInfo, Orders, Comments } from "../components/Home";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { getShopName } from "../utils";
import { Order } from "../services/shopify/types";

export const Home: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
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
            .then(async (customers: string[]) => {
                const customerId = customers[0];

                try {
                    const { customer } = await getCustomer(client, customerId);
                    const { orders } = customer;

                    dispatch({ type: "linkedCustomer", customer });
                    dispatch({ type: "linkedOrders", orders });
                } catch (e) {
                    const error = e as Error;

                    throw new Error(error.message || "Failed to fetch");
                }
            })
            .catch((error: Error) => dispatch({ type: "error", error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    return (!state?.customer /*|| !state.orders*/)
        ? state._error ? null : <>Loading...</>
        : (
            <>
                {state?.customer && (
                    <CustomerInfo
                        {...state.customer}
                        link={`https://${getShopName(state)}.myshopify.com/admin/customers/${state.customer.legacyResourceId}`}
                        onChangePage={() => dispatch({ type: "changePage", page: "view_customer" })}
                    />
                )}
                {state?.orders && (
                    <Orders
                        numberOfOrders={state.customer?.numberOfOrders || '0'}
                        orders={state.orders}
                        link={`https://${getShopName(state)}.myshopify.com/admin/orders`}
                        onChangePage={() => dispatch({ type: "changePage", page: "list_orders" })}
                        onChangePageOrder={onChangePageOrder}
                    />
                )}
                {state?.customer?.comments && (
                    <Comments comments={state.customer.comments} />
                )}
            </>
        );
};
