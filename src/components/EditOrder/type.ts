import type { Maybe } from "../../types";
import type { Order } from "../../services/shopify/types";

export type FormState = {
    financialStatus: Order["displayFinancialStatus"]|string,
    fulfillmentStatus: Order["displayFulfillmentStatus"]|string,
    note: Order["note"],
    shippingFirstName: Order["shippingAddress"]["firstName"],
    shippingLastName: Order["shippingAddress"]["lastName"],
    shippingAddress1: Order["shippingAddress"]["address1"],
    shippingAddress2: Order["shippingAddress"]["address2"],
    shippingCity: Order["shippingAddress"]["city"],
    shippingZip: Order["shippingAddress"]["zip"],
    billingFirstName: Order['billingAddress']["firstName"],
    billingLastName: Order['billingAddress']["lastName"],
    billingAddress1: Order['billingAddress']["address1"],
    billingAddress2: Order['billingAddress']["address2"],
    billingCity: Order['billingAddress']["city"],
    billingZip: Order['billingAddress']["zip"],
};

export type FormProps = {
  order?: Order,
  error: Maybe<string|string[]>,
  onCancel: () => void,
  onSubmit: (values: FormState) => Promise<void>,
};
