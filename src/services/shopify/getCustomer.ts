/* eslint-disable */
import get from "lodash/get";
import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { CustomerType } from "./types";

const getCustomer = (
  client: IDeskproClient,
  customerId: string
) => {
  const query = gql({id: customerId})`query getCustomer($id: ID!) {
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
      tags,
      amountSpent { amount, currencyCode },
      emailMarketingConsent {
        marketingState,
        consentUpdatedAt,
        marketingOptInLevel,
      },
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

  return baseGraphQLRequest<{ customer: CustomerType }>(client, { data: query })
    .then(({ data }) => {
      const customer = get(data, ["customer"]);
      return ({
        customer: {
          ...customer,
          // @ts-ignore
          orders: !customer?.orders?.edges?.length
            ? []
            // @ts-ignore
            : customer.orders.edges.map(({ node }: any) => ({
              ...node,
              lineItems: !node?.lineItems?.edges?.length
                ? []
                : node.lineItems.edges.map(({ node }: any) => ({ ...node }))
            })),
          // @ts-ignore
          comments: !customer?.events?.edges?.length
            ? []
            // @ts-ignore
            : customer.events.edges.map(({ node }: any) => ({ ...node })),
        }
      })
    });
};

export { getCustomer };
