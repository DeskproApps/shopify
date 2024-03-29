import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Order, OrderUpdateValue } from "./types";

const setOrder = (
    client: IDeskproClient,
    orderId: Order['id'],
    values: OrderUpdateValue,
) => {
    const query = gql({ input: {
      ...values,
      id: orderId,
    }})`
        mutation orderUpdate($input: OrderInput!) {
            orderUpdate(input: $input) {
                userErrors { field, message }
                order {
                    id,
                    legacyResourceId,
                    createdAt,
                    displayFinancialStatus,
                    displayFulfillmentStatus,
                    note,
                    name,
                    customer { lastName firstName displayName }
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
                    shippingAddress { address1, address2, city, countryCodeV2, zip, firstName, lastName },
                    billingAddress { address1, address2, city, countryCodeV2, zip, firstName, lastName }
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
            }
        }
    `;

    return baseGraphQLRequest(client, { data: query });
};

export { setOrder };
