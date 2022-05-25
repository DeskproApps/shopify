import { FC, useEffect } from "react";
import {
    H1,
    Pill,
    HorizontalDivider,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { TextBlockWithLabel } from "../components/common";
import { OrderItem, PriceItem } from "../components/ViewOrder";

const order = {
    items: [
        {
            id: "1",
            mos: "10",
            name: "Laptop",
            price: "1,500.00",
            description: "Medium / Claim ipsum dolor sit amet",
            qty: "1",
        },
        {
            id: "2",
            mos: "10",
            name: "Pillow",
            price: "50.00",
            description: "Soft / Double ipsum dolor sit amet",
            qty: "1",
        },
    ],
    subtotal: '1,550.00',
    shipping: '25.00',
    taxes: '62.30',
    total: '1,637.30',
    paymentStatus: 'Paid',
    orderStatus: 'Unfulfilled',
    note: '',
    shippingAddress: 'Market St San Francisco, CA 1019',
    billingAddress: 'Market St San Francisco, CA 1019',
    created: '21/06/2020 | 13:17pm',
};

export const ViewOrder: FC = () => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();

    useEffect(() => {
        client?.setTitle("#4357");
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.registerElement("shopifyEditButton", {
            type: "edit_button",
            payload: { type: "changePage", page: "edit_order" },
        });
        client?.registerElement("shopifyMenu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", page: "list_orders" },
            }, {
                title: "Settings",
                payload: "settings",
            }],
        });
    }, [client, state]);

    return (
        <>
            {order.items.map((item) => (
                <OrderItem key={item.id} {...item} />
            ))}
            <PriceItem title="Subtotal" price={order.subtotal} />
            <PriceItem title="Shipping" price={order.shipping} />
            <PriceItem title="Taxes:" price={order.taxes} />
            <PriceItem title="Total Value (2)" price={order.total} style={{ backgroundClip: theme.colors.grey5 }} />
            <HorizontalDivider style={{ marginBottom: "10px" }}/>
            <H1>Information</H1>
            <TextBlockWithLabel
                label="Payment status"
                text={(
                    <Pill
                        label={order.paymentStatus}
                        textColor={theme.colors.white}
                        backgroundColor={theme.colors.turquoise100}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Fulfillment status"
                text={(
                    <Pill
                        label={order.orderStatus}
                        textColor={theme.colors.white}
                        backgroundColor={theme.colors.scarlett100}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Order notes"
                text={order.note || '-'}
            />
            <TextBlockWithLabel
                label="Shipping Address"
                text={order.shippingAddress}
            />
            <TextBlockWithLabel
                label="Billing Address"
                text={order.billingAddress}
            />
            <TextBlockWithLabel
                label="Created"
                text={order.created}
            />
        </>
    );
};
