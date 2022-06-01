import { Order } from "../../../services/shopify/types";

export type Props = Order & {
    linkOrder: string,
    onChangePage: (orderId: Order['id']) => void
};
