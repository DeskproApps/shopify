import { useCallback } from "react";
import get from "lodash/get";
import { Link, Title, Property } from "@deskpro/app-sdk";
import { formatPrice } from "../../../utils";
import { ShopifyLogo, DPNormalize } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Maybe } from "../../../types";
import type { CustomerType } from "../../../services/shopify/types";

export type Props = {
  link: Maybe<string>,
  customer: CustomerType,
  onNavigateToCustomer: (customerId: CustomerType["id"]) => void,
};


const CustomerInfo: FC<Props> = ({
    link,
    customer,
    onNavigateToCustomer,
}) => {
    const totalSpent = formatPrice(get(customer, ["amountSpent", "amount"]), {
      currency: get(customer, ["amountSpent", "currencyCode"]),
    });

    const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
      e.preventDefault();

      if (onNavigateToCustomer && customer.id) {
        onNavigateToCustomer(customer.id);
      }
    }, [onNavigateToCustomer, customer]);

    return (
        <>
            <Title
                title={(
                    <Link href="#" onClick={onClick}>{get(customer, ["displayName"])}</Link>
                )}
                {...(!link ? {} : { link })}
                {...(!link ? {} : { icon: <ShopifyLogo/> })}
            />
            <Property
                label="Email"
                text={get(customer, ["email"])}
            />
            <Property
                label="Total spent"
                text={totalSpent}
            />
            <Property
                label="Customer Note"
                text={<DPNormalize text={get(customer, ["note"])}/>}
            />
        </>
    );
};

export { CustomerInfo };
