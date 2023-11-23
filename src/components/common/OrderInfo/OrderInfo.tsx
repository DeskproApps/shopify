import { useCallback } from "react";
import { Pill } from "@deskpro/deskpro-ui";
import {
  Link,
  Title,
  TwoProperties,
  HorizontalDivider,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { ShopifyLogo } from "../../common";
import {
  getDate,
  getFullName,
  getShippingStatusName,
  getShippingStatusColorSchema,
  getPaymentStatusName,
  getPaymentStatusColorSchema
} from "../../../utils";
import type { FC, MouseEventHandler } from "react";
import type { Props } from "./types";

const OrderInfo: FC<Props> = ({
  id,
  name,
  isLast,
  customer,
  createdAt,
  linkOrder,
  onChangePage,
  displayFinancialStatus,
  displayFulfillmentStatus,
}) => {
  const { theme } = useDeskproAppTheme();
  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onChangePage && onChangePage(id);
  }, [onChangePage, id]);

  return (
    <>
      <Title
        title={(
          <Link href="#" onClick={onClick}>{name}</Link>
        )}
        {...(!linkOrder ? {} : { link: linkOrder })}
        {...(!linkOrder ? {} : { icon: <ShopifyLogo/> })}
      />
      <TwoProperties
        leftLabel="Customer"
        leftText={getFullName(customer)}
        rightLabel="Date"
        rightText={getDate(createdAt)}
      />
      <TwoProperties
        leftLabel="Payment status"
        leftText={(
          <Pill
            textColor={theme.colors.white}
            label={getPaymentStatusName(displayFinancialStatus)}
            backgroundColor={getPaymentStatusColorSchema(theme, displayFinancialStatus)}
          />
        )}
        rightLabel="Fulfillment status"
        rightText={(
          <Pill
            textColor={theme.colors.white}
            label={getShippingStatusName(displayFulfillmentStatus)}
            backgroundColor={getShippingStatusColorSchema(theme, displayFulfillmentStatus)}
          />
        )}
      />
      {!isLast && <HorizontalDivider style={{ marginBottom: 9 }}/>}
    </>
  );
}

export { OrderInfo };
