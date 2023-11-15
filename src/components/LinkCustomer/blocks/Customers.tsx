import { Fragment } from "react";
import size from "lodash/size";
import { P5, Label, Stack, Checkbox } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme, HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { NoFound } from "../../common";
import type { FC, ChangeEvent } from "react";
import type { CustomerType } from "../../../services/shopify/types";

type Props =  {
  isLoading: boolean,
  customers: CustomerType[],
  selectedCustomerId: CustomerType["id"],
  onChangeSelectedCustomer: (e: ChangeEvent<HTMLInputElement>) => void,
};

type CustomerProps = {
  checked: boolean,
  customer: CustomerType,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

const Customer: FC<CustomerProps> = ({
  checked,
  customer,
  onChange,
}) => {
    const { theme } = useDeskproAppTheme();

    return (
        <Stack align="center" justify="start" style={{ marginBottom: 5 }}>
            <Label htmlFor={`customer-${customer.id}`}>
                <Checkbox
                    value={customer.id}
                    checked={checked}
                    onChange={onChange}
                    id={`customer-${customer.id}`}
                    label={(
                        <>
                            <P5>{customer.displayName}</P5>
                            {customer.email && (
                                <P5 style={{ color: theme.colors.grey80 }}>
                                    &lt;{customer.email}&gt;
                                </P5>
                            )}
                        </>
                    )}
                />
            </Label>
        </Stack>
    );
}

const Customers: FC<Props> = ({
  isLoading,
  customers,
  selectedCustomerId,
  onChangeSelectedCustomer,

}) => {
  return isLoading
    ? <LoadingSpinner />
    : (
      <>
        {(!Array.isArray(customers) || !size(customers))
          ? <NoFound text="No matching customers found. Please try again." />
          : customers.map((customer) => (
            <Fragment key={customer.id}>
              <Customer
                customer={customer}
                checked={selectedCustomerId === customer.id}
                onChange={onChangeSelectedCustomer}
              />
              <HorizontalDivider />
            </Fragment>
          ))
        }
      </>
    )
};

export { Customers };
