import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { CustomerType } from "./types";

const getCustomer = (
    client: IDeskproClient,
    customerId: string
): Promise<{ customer: CustomerType }> => {
    const variables = { id: customerId };
    const query = `query getCustomer($id: ID!) {
        customer(id: $id) {
            id,
            legacyResourceId,
            displayName
            createdAt,
            displayName,
            email,
            hasTimelineComment,
            locale,
            note,
            phone,
            firstName,
            lastName,
            numberOfOrders,
            amountSpent { amount, currencyCode },
            orders(first: 50) {
                edges {
                    node {
                        id, legacyResourceId, createdAt, displayFinancialStatus, displayFulfillmentStatus,
                        lineItems(first: 6) {
                            edges {
                                node {
                                    id, title
                                }
                            }
                        }
                    }
                }
            },
            events(first: 100, query: "verb:comment") {
                edges {
                    node {
                        id, message, createdAt
                    }
                }
            },      
        }
    }`;

    return baseGraphQLRequest(client, { query, variables })
        .then(({ customer }) => {
            return ({
                customer: {
                    ...customer,
                    orders: !customer?.orders?.edges?.length
                        ? []
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        : customer.orders.edges.map(({ node }: any) => ({
                            ...node,
                            lineItems: !node?.lineItems?.edges?.length
                                ? []
                                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                                : node.lineItems.edges.map(({ node }: any) => ({ ... node }))
                        })),
                    comments: !customer?.events?.edges?.length
                        ? []
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        : customer.events.edges.map(({ node }: any) => ({...node })),
                }
            })
        });
};

export { getCustomer };
