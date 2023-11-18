import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";

export const getShopInfo = (client: IDeskproClient) => {
    const query = gql`query {
        shop {
            description, email, id, name, url
        }
    }`;

    return baseGraphQLRequest(client, { data: query });
};
