import { useState, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useRegisterElements, useSetTitle } from "../../hooks";
import { useCustomer } from "../../hooks";
import { EditCustomerForm } from "../../components/EditCustomer";
import { setCustomer } from "../../services/shopify";
import { getApiErrors } from "../../utils";
import { getValues } from "../../components/EditCustomer";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormState } from "../../components/EditCustomer";

const EditCustomerPage: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("customerId");
    const { client } = useDeskproAppClient();
    const [error, setError] = useState<Maybe<string|string[]>>(null);
    const { isLoading, customer } = useCustomer(customerId);

    const onCancel = useCallback(() => {
      navigate({ pathname: `/view_customer`, search: `?customerId=${customerId}` })
    }, [navigate, customerId]);

    const onSubmit = useCallback((values: FormState) => {
        if (!client || !customer?.id) {
          return Promise.resolve();
        }

        setError(null);

        return setCustomer(client, customer.id, getValues(values, customer))
          .then(([customerUpdate, customerEmailMarketingConsentUpdate]) => {
            const customerErrors = get(customerUpdate,["data", "customerUpdate", "userErrors"]);
            const emailErrors = get(
              customerEmailMarketingConsentUpdate,
              ["data", "customerEmailMarketingConsentUpdate", "emailErrors"],
            );

            if (isEmpty(customerErrors) && isEmpty(emailErrors)) {
              navigate({
                pathname: `/view_customer`,
                search: `?customerId=${customer.id}`,
              });
            } else {
              const errors = [
                ...getApiErrors(customerErrors),
                ...getApiErrors(emailErrors),
              ]
              setError(errors);
            }
          })
          .catch((error) => setError(get(error, ["errors"], error)));
    }, [client, navigate, customer]);

    useSetTitle("Edit Customer");

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    });

    if (isLoading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <EditCustomerForm
        error={error}
        customer={customer}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    );
};

export { EditCustomerPage };
