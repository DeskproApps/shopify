import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { CustomerSearchParams } from "./types";

export const getCustomers = (client: IDeskproClient, params: CustomerSearchParams = {}) => {
    const { querySearch = '', email = '' } = params;
    const search = `${querySearch}${!email ? '' : `email:${email}`}`;

    return baseRequest(client, `/customers/search.json?query=${search}`)
};
