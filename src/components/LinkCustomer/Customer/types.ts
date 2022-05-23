import { ChangeEvent } from "react";
import { CustomerType } from "../../../services/shopify/types";

export type Props = CustomerType & {
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};
