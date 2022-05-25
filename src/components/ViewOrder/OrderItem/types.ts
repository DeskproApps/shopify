export type OrderItemType = {
    id: string,
    mos: string,
    name: string,
    price: string,
    description: string,
    qty: string,
};

export type Props = {
    id: string,
    items: Array<OrderItemType>,
    subtotal: string
    shipping: string,
    taxes: string,
    total: string,
    paymentStatus: string,
    orderStatus: string,
    note: string,
    shippingAddress: string,
    billingAddress: string,
    created: string,
};
