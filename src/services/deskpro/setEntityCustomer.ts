import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";

const setEntityCustomer = (client: IDeskproClient, userId: string, shopifyCustomerId: string) => {
    return client
        .getEntityAssociation(ENTITY, userId)
        .set(shopifyCustomerId)
};

export { setEntityCustomer };
