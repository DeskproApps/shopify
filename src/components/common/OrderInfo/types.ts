import type { Maybe } from "../../../types";
import type { Order } from "../../../services/shopify/types";

export type Props = Order & {
  isLast?: boolean,
  linkOrder: Maybe<string>,
  onChangePage: (orderId: Order['id']) => void
};
