import { IDeskproClient } from "@deskpro/app-sdk";
import { SHOPIFY_ENTITY } from "./constants";

const setEntityCustomer = (client: IDeskproClient, userId: string, shopifyCustomerId: string) => {
    return client
        .getEntityAssociation(SHOPIFY_ENTITY, userId)
        .set(shopifyCustomerId)
};

export { setEntityCustomer };
