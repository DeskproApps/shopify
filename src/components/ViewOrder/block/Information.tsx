import omit from "lodash/omit";
import { P5, Pill } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme, Title, Property } from "@deskpro/app-sdk";
import {
  getTime,
  getDate,
  getPaymentStatusColorSchema,
  getPaymentStatusName,
  getShippingStatusColorSchema,
  getShippingStatusName,
} from "../../../utils";
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
        text={note || (<P5 style={{color: theme.colors.grey40}}>None</P5>)}
      />
      <Property
        label="Shipping Address"
        text={Object.values(omit(shippingAddress, ["firstName", "lastName"])).join(", ")}
      />
      <Property
        label="Billing Address"
        text={Object.values(omit(billingAddress, ["firstName", "lastName"])).join(", ")}
      />
      <Property
        label="Created"
        text={`${getDate(createdAt)} | ${getTime(createdAt)}`}
      />
    </>
  );
}

export { Information };
