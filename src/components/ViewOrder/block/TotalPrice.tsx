import { useDeskproAppTheme } from "@deskpro/app-sdk";
import { PriceItem } from "./PriceItem";
import type { FC } from "react";
import type { Order } from "../../../services/shopify/types";

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
        style={{backgroundClip: theme.colors.grey5}}
      />
    </>
  );
};

export {TotalPrice};
