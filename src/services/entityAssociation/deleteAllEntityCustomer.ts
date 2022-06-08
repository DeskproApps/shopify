import { IDeskproClient } from "@deskpro/app-sdk";
import { CustomerType } from "../shopify/types";
import { SHOPIFY_ENTITY } from "./constants";
import { deleteEntityCustomer } from "./deleteEntityCustomer";

const deleteAllEntityCustomer = (client: IDeskproClient, userId: string, shopifyCustomerIds: Array<CustomerType["id"]>) => {
    return Promise.all(shopifyCustomerIds.map((customerId) => {
        return deleteEntityCustomer(client, userId, customerId)
    }));
};

export { deleteAllEntityCustomer };
