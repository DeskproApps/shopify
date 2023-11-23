import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CustomerType, CustomerUpdateValues } from "./types";

const setCustomer = (
    client: IDeskproClient,
    customerId: CustomerType['id'],
    { emailMarketingConsent, ...values }: CustomerUpdateValues,
) => {
    const query = gql({ input: {
      ...values,
        id: customerId,
    }})`
        mutation customerUpdate($input: CustomerInput!) {
            customerUpdate(input: $input) {
                userErrors { field, message },
                customer {
                    id, ${Object.keys(values).join(', ')}, emailMarketingConsent { marketingState },

                }
            }
        }
    `;
    const queryEmail = gql({ input: {
      customerId,
      emailMarketingConsent,
    }})`
        mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
            customerEmailMarketingConsentUpdate(input: $input) {
                userErrors { field, message },
                customer { id }
            }
        }
    `;

    return Promise.all([
        baseGraphQLRequest(client, { data: query }),
        baseGraphQLRequest(client, { data: queryEmail }),
    ])
        .catch((errors) => {
            let error = "";

            if (Array.isArray(errors)) {
                error = errors.map(({ message }) => message).join("; ")
            } else {
                error = `${errors}`;
            }

            return Promise.reject(error);
        });
};

export { setCustomer };
