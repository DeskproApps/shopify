/* eslint-disable */
import get from "lodash/get";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type {IDeskproClient} from "@deskpro/app-sdk";
import type {Order} from "./types";

const getOrder = (
  client: IDeskproClient,
  orderId: Order['id'],
): Promise<{ order: Order }> => {
  const query = gql({id: orderId})`query getOrder($id: ID!) {
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
      shippingAddress { address1, address2, city, countryCodeV2, zip, firstName, lastName },
      billingAddress { address1, address2, city, countryCodeV2, zip, firstName, lastName }
      lineItems(first: 10) {
        edges {
          node {
            id, quantity, title,
            image { altText, url },
            product { id, title, description }
            originalUnitPriceSet {
              presentmentMoney { amount, currencyCode },
            }
          }
        }
      }
    }
  }`;

  return baseGraphQLRequest(client, { data: query })
    // @ts-ignore
    .then(({ data }) => {
      const order = get(data, ["order"]);
      return {
        order: {
          ...order,
          lineItems: !order.lineItems?.edges?.length
            ? []
            : order.lineItems.edges.map(({ node }: any) => ({ ...node }))
        }
      };
    });
};

export { getOrder };
