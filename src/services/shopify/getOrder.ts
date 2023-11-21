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
      shippingAddress { id firstName lastName name address1 address2 city company country countryCodeV2 formatted formattedArea phone province provinceCode timeZone zip },
      billingAddress { id firstName lastName name address1 address2 city company country countryCodeV2 formatted formattedArea phone province provinceCode timeZone zip }
      lineItems(first: 10) {
        edges {
          node {
            id, quantity, title, sku,
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
