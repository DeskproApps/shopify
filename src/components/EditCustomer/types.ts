import type { Maybe } from "../../types";
import type { CustomerType } from "../../services/shopify/types";

export type FormState = {
    firstName: CustomerType['firstName'],
    lastName: CustomerType['lastName'],
    email: CustomerType['email'],
    phone: CustomerType['phone'],
    isReceiveMarketingEmail: boolean,
    note: CustomerType['note'],
};

export type FormProps = {
  customer: CustomerType,
  onSubmit: (values: FormState) => Promise<void>,
  onCancel: () => void,
  error: Maybe<string|string[]>,
};

