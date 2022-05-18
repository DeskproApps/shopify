import { IDeskproClient } from "@deskpro/app-sdk";
import { SHOPIFY_ENTITY } from "./constants";
import { Customer } from "../shopify/types";

const getEntityCustomerList = (
    client: IDeskproClient,
    userId: string
): Promise<Array<Customer['id']>> => {
    return client
        .getEntityAssociation(SHOPIFY_ENTITY, userId)
        .list()
}

export { getEntityCustomerList };
