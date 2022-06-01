import { CustomerType } from "../../../services/shopify/types";

export type Props = CustomerType & {
    link: string,
    onChangePage: () => void,
};
