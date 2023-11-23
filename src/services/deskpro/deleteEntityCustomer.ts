import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";

const deleteEntityCustomer = (client: IDeskproClient, userId: string, shopifyCustomerId: string) => {
    return client
        .getEntityAssociation(ENTITY, userId)
        .delete(shopifyCustomerId)
};

export { deleteEntityCustomer };
