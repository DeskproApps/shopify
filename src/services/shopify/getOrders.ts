import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Orders } from "./types";

const getOrders = (client: IDeskproClient, customerId: string | number): Promise<{ orders: Orders }> => {
    return baseRequest(client, `/customers/${customerId}/orders.json?status=any`);
};

export { getOrders };
