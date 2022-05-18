import { IDeskproClient } from "@deskpro/app-sdk";
import { SHOPIFY_ENTITY } from "./constants";

const getEntityCustomerList = (
    client: IDeskproClient,
    userId: string
): Promise<string[]> => {
    return client
        .getEntityAssociation(SHOPIFY_ENTITY, userId)
        .list()
}

export { getEntityCustomerList };
