import { Customer } from "../../services/shopify/types";

export type Props = Customer & {
    onChange: () => void
};
