import { CustomerType } from "../../services/shopify/types";

export type FormState = {
    firstName: CustomerType['firstName'],
    lastName: CustomerType['lastName'],
    email: CustomerType['email'],
    phone: CustomerType['phone'],
    isReceiveMarketingEmail: boolean,
    note: CustomerType['note'],
};
