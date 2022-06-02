import { FC } from "react";
import {
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { Order } from "../../../services/shopify/types";
import { PriceItem } from "./PriceItem";

const TotalPrice: FC<Order> = ({
    lineItems,
    totalTaxSet,
    totalPriceSet,
    subtotalPriceSet,
    totalShippingPriceSet,
}) => {
    const { theme } = useDeskproAppTheme();

    return (
        <>
            <PriceItem title="Subtotal" {...subtotalPriceSet.presentmentMoney} />
            <PriceItem title="Shipping" {...totalShippingPriceSet.presentmentMoney} />
            <PriceItem title="Taxes:" {...totalTaxSet.presentmentMoney} />
            <PriceItem
                title={`Total Value (${lineItems.length})`}
                {...totalPriceSet.presentmentMoney}
                style={{ backgroundClip: theme.colors.grey5 }}
            />
            <HorizontalDivider style={{ marginBottom: 10 }}/>
        </>
    );
};

export { TotalPrice };
