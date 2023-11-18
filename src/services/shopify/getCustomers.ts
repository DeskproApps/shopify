/* eslint-disable */
import get from "lodash/get";
import size from "lodash/size";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CustomerSearchParams, CustomerType } from "./types";

type ResponseType = {
  customers: {
    edges?: Array<{ node: CustomerType }>
  }
};

export const getCustomers = (
  client: IDeskproClient,
  params: CustomerSearchParams = {}
) => {
  const { querySearch = "", email = "" } = params;
  const search = `${querySearch}${!email ? "" : `email:${email}`}`;

  const query = gql({ q: search })`query getCustomers ($q: String) {
    customers(first: 100, query: $q) {
      edges {
        node {
          id, createdAt, displayName, email, hasTimelineComment, locale, note, phone
        }
      }
    }
  }`;

  return baseGraphQLRequest<{ customers: CustomerType[] }>(client, {data: query})
    // @ts-ignore
    .then((res: ResponseType) => {
      const customers = get(res, ["data", "customers", "edges"], []) || [];

      if (!Array.isArray(customers) || !size(customers)) {
        return { customers: [] };
      }

      return {
        customers: customers.map(({node}: { node: CustomerType }) => ({ ...node }))
      };
    });
};
