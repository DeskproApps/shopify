import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { Order } from "./types";

const getOrder = (
    client: IDeskproClient,
    orderId: Order['id'],
): Promise<{ order: Order }> => {
    const variables = { id: orderId };
    const query = `query getOrder($id: ID!) {
        order(id: $id) {
            id,
            legacyResourceId,
            createdAt,
            displayFinancialStatus,
            displayFulfillmentStatus,
            note,
            subtotalPriceSet {
                presentmentMoney { amount, currencyCode }
            },
            totalShippingPriceSet {
                presentmentMoney { amount, currencyCode }
            },
            totalTaxSet {
                presentmentMoney { amount, currencyCode }
            },
            totalPriceSet {
                presentmentMoney { amount, currencyCode }
            },
            shippingAddress { address1, city, countryCodeV2, zip },
            billingAddress { address1, city, countryCodeV2, zip }
            lineItems(first: 10) {
                edges {
                    node {
                        id, quantity, title,
                        image {
                            altText, url,
                        },
                        product {
                            id, title, description,
                        }
                        originalUnitPriceSet {
                            presentmentMoney { amount, currencyCode },
                        }
                    }
                }
            }
        }
    }`;

    return baseGraphQLRequest(client, { query, variables })
        .then(({ order }) => ({
            order: {
                ...order,
                lineItems: !order.lineItems?.edges?.length
                    ? []
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    : order.lineItems.edges.map(({ node }: any) => ({ ... node }))
            }
        }));
};

export { getOrder };
