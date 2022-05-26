import { CustomerType } from "../../../services/shopify/types";

export type Props = Partial<CustomerType> & {
    link: string,
    onChangePage: () => void,
};
