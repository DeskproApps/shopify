import { CustomerType, Orders, Order } from "../../../services/shopify/types";

export type Props = {
    link: string,
    orders: Orders,
    onChangePage: () => void,
    onChangePageOrder: (orderId: Order['id']) => void,
    ordersCount?: CustomerType['orders_count'],
};
