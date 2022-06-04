import { IDeskproClient } from "@deskpro/app-sdk";
import { baseGraphQLRequest } from "./baseGraphQLRequest";
import { CustomerType } from "./types";

export type CustomerUpdateValues =
    Pick<CustomerType, "firstName" | "lastName" | "email" | "phone" | "note" | "emailMarketingConsent">;

const setCustomer = (
    client: IDeskproClient,
    customerId: CustomerType['id'],
    { emailMarketingConsent, ...values }: CustomerUpdateValues,
) => {
    const variables = {
        input: {
            ...values,
            // emailMarketingConsent,
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

    return baseGraphQLRequest(client, { query, variables })
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
