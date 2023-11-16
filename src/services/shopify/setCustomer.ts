import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { CustomerType, CustomerUpdateValues } from "./types";

const setCustomer = (
    client: IDeskproClient,
    customerId: CustomerType['id'],
    { emailMarketingConsent, ...values }: CustomerUpdateValues,
) => {
    const variables = {
        input: {
            ...values,
            id: customerId,
        },
    };
    const query = `
        mutation customerUpdate($input: CustomerInput!) {
            customerUpdate(input: $input) {
                userErrors { field, message },
                customer {
                    id, ${Object.keys(values).join(', ')}, emailMarketingConsent { marketingState },

                }
            }
        }
    `;
    const variablesEmail = {
        input: {
            customerId,
            emailMarketingConsent,
        },
    };
    const queryEmail = `
        mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
            customerEmailMarketingConsentUpdate(input: $input) {
                userErrors { field, message },
                customer { id }
            }
        }
    `;

    return Promise.all([
        baseGraphQLRequest(client, { query, variables }),
        baseGraphQLRequest(client, { query: queryEmail, variables: variablesEmail }),
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
