import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    LoadingSpinner,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  useSetTitle,
  useExternalLink,
  useRegisterElements,
} from "../../hooks";
import { useCustomer } from "../../hooks";
import { ViewCustomer } from "../../components";
import type { FC } from "react";

const ViewCustomerPage: FC = () => {
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("customerId");
    const { theme } = useDeskproAppTheme();
    const { client } = useDeskproAppClient();
    const { getCustomerLink } = useExternalLink();
    const { isLoading, customer } = useCustomer(customerId);
    const customerLink = useMemo(() => {
      return getCustomerLink(customer?.legacyResourceId);
    }, [getCustomerLink, customer?.legacyResourceId]);

    useSetTitle(customer?.displayName || "Shopify");

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
        registerElement("edit", {
            type: "edit_button",
            payload: {
              type: "changePage",
              path: {
                pathname: "/edit_customer",
                search: `?customerId=${customer?.id}`,
              }
            },
        });

        if (customerLink) {
            registerElement("external", {
                type: "cta_external_link",
                url: customerLink,
                hasIcon: true,
            });
        }
    }, [client, customer]);


    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
      <ViewCustomer
        customer={customer}
        theme={theme}
      />
    );
};

export { ViewCustomerPage };
