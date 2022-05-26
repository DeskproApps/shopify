import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { CustomerType } from "./types";

const getCustomer = (client: IDeskproClient, customerId: string): Promise<{ customer: CustomerType }> => {
    return baseRequest(client, `/customers/${customerId}.json`);
};

export { getCustomer };
