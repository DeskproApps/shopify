import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, Settings } from "../../types";
import type { ShopInfo } from "./types";

export const getShopInfo = (
  client: IDeskproClient,
  settings?: Maybe<Settings>,
) => {
    const query = gql`query {
        shop {
          description email id name url
        }
    }`;

    return baseGraphQLRequest<{ shop: ShopInfo }>(client, { data: query, settings });
};
