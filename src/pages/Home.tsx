import { FC, useEffect } from "react";
import {
    useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { CustomerInfo, Orders, Comments } from "../components/Home";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer, getOrders } from "../services/shopify";
import { getShopName } from "../utils";

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

    const onChangePageOrder = (orderId: number) => {
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
                    const { orders } = await getOrders(client, customerId);

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

    return (!state?.customer || !state.orders)
        ? state._error ? null : <>Loading...</>
        : (
            <>
                <CustomerInfo
                    {...state.customer}
                    link={`https://${getShopName(state)}.myshopify.com/admin/customers/${state.customer.id}`}
                    onChangePage={() => dispatch({ type: "changePage", page: "view_customer" })}
                />
                <Orders
                    ordersCount={state.customer?.orders_count || 0}
                    orders={state.orders}
                    link={`https://${getShopName(state)}.myshopify.com/admin/orders`}
                    onChangePage={() => dispatch({ type: "changePage", page: "list_orders" })}
                    onChangePageOrder={onChangePageOrder}
                />
                <Comments
                    comments={[
                        { id: "1", date: "10 mos", comment: "The user was particularly interested in purchasing." },
                        { id: "2", date: "1yr", comment: "The user said that he was really satisfied with our support agent. John offered a discount if the user is going to upgrade to let agents to use Deskpro. " },
                        { id: "3", date: "1yr", comment: "Test note." },
                    ]}
                />
            </>
        );
};
