import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

// ToDo: need return type
const getCustomer = (client: IDeskproClient, customerId: string) => {
    return baseRequest(client, `/customers/${customerId}.json`)
};

export { getCustomer };
