import { Pill } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme, Title, Property } from "@deskpro/app-sdk";
import {
  getTime,
  getDate,
  formatAddress,
  getPaymentStatusColorSchema,
  getPaymentStatusName,
  getShippingStatusColorSchema,
  getShippingStatusName,
} from "../../../utils";
import { DPNormalize } from "../../common";
import type { FC } from "react";
import type { Order } from "../../../services/shopify/types";

const Information: FC<Order> = ({
  note,
  createdAt,
  billingAddress,
  shippingAddress,
  displayFinancialStatus,
  displayFulfillmentStatus,
}) => {
  const { theme } = useDeskproAppTheme();

  return (
    <>
      <Title title="Information"/>
      <Property
        label="Payment status"
        text={(
          <Pill
            textColor={theme.colors.white}
            label={getPaymentStatusName(displayFinancialStatus)}
            backgroundColor={getPaymentStatusColorSchema(theme, displayFinancialStatus)}
          />
        )}
      />
      <Property
        label="Fulfillment status"
        text={(
          <Pill
            textColor={theme.colors.white}
            label={getShippingStatusName(displayFulfillmentStatus)}
            backgroundColor={getShippingStatusColorSchema(theme, displayFulfillmentStatus)}
          />
        )}
      />
      <Property
        label="Order notes"
        text={<DPNormalize text={note}/>}
      />
      <Property
        label="Shipping Address"
        text={<DPNormalize text={formatAddress(shippingAddress)} />}
      />
      <Property
        label="Billing Address"
        text={<DPNormalize text={formatAddress(billingAddress)} />}
      />
      <Property
        label="Created"
        text={`${getDate(createdAt)} | ${getTime(createdAt)}`}
      />
    </>
  );
}

export { Information };
