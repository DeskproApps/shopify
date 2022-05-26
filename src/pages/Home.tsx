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

    const onChangePageOrder = (orderId: string) => {
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
                if (customer && customer.id) {
                    getOrders(client, customer.id)
                        .then(({ orders }) => {
                            console.log('>>> orders:', orders);
                        })
                }
                dispatch({ type: "linkedCustomer", customer });
            })
            .catch((err) => console.log('>>> home:catch:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    console.log('>>> state.customer:', state.customer);

    return !state?.customer
        ? (<>Loading...</>)
        : (
            <>
                <CustomerInfo
                    {...state.customer}
                    link={`https://${getShopName(state)}.myshopify.com/admin/customers/${state.customer.id}`}
                    onChangePage={() => dispatch({ type: "changePage", page: "view_customer" })}
                />
                {/* Orders */}
                <Orders
                    link={`https://${getShopName(state)}.myshopify.com/admin/orders`}
                    onChangePage={() => dispatch({ type: "changePage", page: "list_orders" })}
                    onChangePageOrder={onChangePageOrder}
                />

                {/* Comments */}
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
