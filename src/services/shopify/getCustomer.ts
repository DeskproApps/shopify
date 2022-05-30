import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { CustomerType } from "./types";

const getCustomer = (
    client: IDeskproClient,
    customerId: string
): Promise<{ customer: CustomerType }> => {
    const query = `query getCustomer($id: ID!) {
        customer(id: $id) {
            displayName
        }
    }`;

    const variables = { id: customerId }

    return baseGraphQLRequest(client, { query, variables })
};

export { getCustomer };
