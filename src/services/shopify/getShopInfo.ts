import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";

export const getShopInfo = (client: IDeskproClient) => {
    const query = `query {
        shop {
            description, email, id, name, url
        }
    }`;

    return baseGraphQLRequest(client, { query });
};
