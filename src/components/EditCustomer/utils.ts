import * as yup from 'yup';
import get from "lodash/get";
import { parseDateTime } from "../../utils";
import type { CustomerType, CustomerUpdateValues } from "../../services/shopify/types";
import type { FormState } from "./types";

const validationSchema = yup.object().shape({
  lastName: yup.string().required(),
  firstName: yup.string().required(),
  email: yup.string().required().email(),
});

const getInitValues = (customer?: CustomerType): FormState => {
  return {
    firstName: get(customer, ["firstName"], ""),
    lastName: get(customer, ["lastName"], ""),
    email: get(customer, ["email"], ""),
    phone: get(customer, ["phone"], ""),
    note: get(customer, ["note"], ""),
    isReceiveMarketingEmail: get(customer, ["emailMarketingConsent", "marketingState"]) === "SUBSCRIBED",
  }
};

const getValues = (
  { isReceiveMarketingEmail, ...values }: FormState,
  customer: CustomerType,
): CustomerUpdateValues => {
  return {
    ...values,
    emailMarketingConsent: {
      marketingState: isReceiveMarketingEmail ? "SUBSCRIBED" : "UNSUBSCRIBED",
      marketingOptInLevel: customer.emailMarketingConsent.marketingOptInLevel,
      consentUpdatedAt: parseDateTime(),
    },
  };
};

export { validationSchema, getInitValues, getValues };
