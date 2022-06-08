import { IDeskproClient } from "@deskpro/app-sdk";
import { SHOPIFY_ENTITY } from "./constants";

const deleteEntityCustomer = (client: IDeskproClient, userId: string, shopifyCustomerId: string) => {
    return client
        .getEntityAssociation(SHOPIFY_ENTITY, userId)
        .delete(shopifyCustomerId)
};

export { deleteEntityCustomer };
