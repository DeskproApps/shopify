import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";

const getEntityCustomerList = (
    client: IDeskproClient,
    userId: string
): Promise<string[]> => {
    return client
        .getEntityAssociation(ENTITY, userId)
        .list()
}

export { getEntityCustomerList };
