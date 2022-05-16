import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

export const getShopInfo = (client: IDeskproClient) => {
    return baseRequest(client, "/shop.json");
};
