import * as yup from 'yup';
import { financialStatuses, fulfillmentStatuses } from "../../utils";
import type { Order, OrderUpdateValue } from "../../services/shopify/types";
import type { FormState } from "./type";

const validationSchema = yup.object().shape({
  financialStatus: yup.string().required().oneOf([...financialStatuses, ""]),
  fulfillmentStatus: yup.string().required().oneOf(fulfillmentStatuses),
});

const getInitValues = (order?: Order): FormState => {
  return {
    note: order?.note || "",
    financialStatus: order?.displayFinancialStatus || "",
    fulfillmentStatus: order?.displayFulfillmentStatus || "",
    shippingAddress1: order?.shippingAddress.address1 || "",
    shippingAddress2: order?.shippingAddress.address2 || "",
    shippingCity: order?.shippingAddress.city || "",
    shippingZip: order?.shippingAddress.zip || "",
    shippingFirstName: order?.shippingAddress.firstName || "",
    shippingLastName: order?.shippingAddress.lastName || "",
    billingAddress1: order?.billingAddress.address1 || "",
    billingAddress2: order?.billingAddress.address2 || "",
    billingCity: order?.billingAddress.city || "",
    billingZip: order?.billingAddress.zip || "",
    billingFirstName: order?.billingAddress.firstName || "",
    billingLastName: order?.billingAddress.lastName || "",
  };
};

const getOrderValues = (
  values: FormState,
  order: Order,
): OrderUpdateValue => {
  return {
    note: values.note,
    shippingAddress: {
      firstName: values.shippingFirstName,
      lastName: values.shippingLastName,
      address1: values.shippingAddress1,
      address2: values.shippingAddress2,
      city: values.shippingCity,
      countryCode: order.shippingAddress.countryCodeV2,
      zip: values.shippingZip,
    }
  }
};

export { validationSchema, getInitValues, getOrderValues };
