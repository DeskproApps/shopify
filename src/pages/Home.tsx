import { FC, /*useState,*/ useEffect } from "react";
import {
    HorizontalDivider,
    useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { Comments } from "../components/Home";
import { SubHeader, OrderInfo, TextBlockWithLabel } from "../components/common";
// import { getEntityCustomerList } from "../services/entityAssociation";
// import { getCustomer } from "../services/shopify";
// import { CustomerType } from "../services/shopify/types";
// import { getFullName } from "../utils";

export const Home: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    // const [customer, setCustomer] = useState<CustomerType | null>(null);
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

    const onChangePageOrder = (orderId: string) => {
        dispatch({ type: "changePage", page: "view_order", params: { orderId } })
    };

    useEffect(() => {
        if (!client) {
            return;
        }

        /*getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                setCustomer(customer);
            })
            .catch((err) => console.log('>>> home:catch:', err));*/
    }, [client, userId]);

    return (
        <>
            {/* Customer Info */}
            <SubHeader
                text="Armen Tamzarian"
                link="https://__shop_name__.myshopify.com/admin/customers/<customerId>"
                onChangePage={() => dispatch({ type: "changePage", page: "view_customer" })}
            />
            <TextBlockWithLabel
                label="Email"
                text="john.jones@company.com"
            />
            <TextBlockWithLabel
                label="Total spent"
                text="1485.00 USD"
            />
            <TextBlockWithLabel
                label="Customer Note"
                text="The user said that he was really satisfied with our support agent. John offered a discount if the user is going to upgrade to let agents to use Deskpro."
            />
            <HorizontalDivider style={{ marginBottom: 10 }}/>

            {/* Orders */}
            <SubHeader
                marginBottom={14}
                text="Orders (9)"
                link="https://__shop_name__.myshopify.com/admin/orders?"
                onChangePage={() => dispatch({ type: "changePage", page: "list_orders" })}
            />
            {[
                { id: "1", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
                { id: "2", orderName: "Television", date: "17 May, 2020", status: "fulfilled" },
                { id: "3", orderName: "John Lewis & Partners Puppytooty & many many more", date: "17 May, 2020", status: "onHold" },
                { id: "4", orderName: "Mens T-Shirt XL", date: "17 May, 2020", status: "onHold" },
                { id: "5", orderName: "Oven", date: "17 May, 2020", status: "unfulfilled" },
            ].map((order) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                <OrderInfo key={order.id} onChangePage={onChangePageOrder} {...order} />
            ))}

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
