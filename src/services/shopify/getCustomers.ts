import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { CustomerSearchParams, CustomerType } from "./types";

type ResponseType = {
    customers: {
        edges?: Array<{ node: CustomerType }>
    }
};

export const getCustomers = (
    client: IDeskproClient,
    params: CustomerSearchParams = {}
): Promise<{ customers: CustomerType[] }> => {
    const { querySearch = '', email = '' } = params;
    const search = `${querySearch}${!email ? '' : `email:${email}`}`;

    const query = `query getCustomers ($q: String) {
        customers(first: 100, query: $q) {
            edges {
                node {
                    id, createdAt, displayName, email, hasTimelineComment, locale, note, phone
                }
            }
        }
    }`;

    const variables = { q: search };

    return baseGraphQLRequest(client, { query, variables })
        .then(({ customers }: ResponseType) => {
            if (!customers?.edges?.length) {
                return { customers: [] };
            }

            return {
                customers: customers.edges.map(({ node }: { node: CustomerType }) => ({ ...node }))
            };
        });
};
