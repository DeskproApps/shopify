import { useCallback } from "react";
import get from "lodash/get";
import { Link, Title, Property } from "@deskpro/app-sdk";
import { ShopifyLogo } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { CustomerType } from "../../../services/shopify/types";

export type Props = {
  link: string,
  customer: CustomerType,
  onNavigateToCustomer: (customerId: CustomerType["id"]) => void,
};


const CustomerInfo: FC<Props> = ({
    link,
    customer,
    onNavigateToCustomer,
}) => {
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
                link={link}
                icon={<ShopifyLogo/>}
            />
            <Property
                label="Email"
                text={get(customer, ["email"])}
            />
            <Property
                label="Total spent"
                text={`${get(customer, ["amountSpent", "amount"])} ${get(customer, ["amountSpent", "currencyCode"])}`}
            />
            <Property
                label="Customer Note"
                text={get(customer, ["note"], "-") || "-"}
            />
        </>
    );
};

export { CustomerInfo };
