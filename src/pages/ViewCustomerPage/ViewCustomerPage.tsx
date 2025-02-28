import { ContextData, Settings } from "@/types";
import { useCustomer } from "../../hooks";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ViewCustomer } from "../../components";
import { LoadingSpinner, useDeskproAppClient, useDeskproAppTheme, useDeskproElements, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useExternalLink, useSetTitle } from "../../hooks";
import type { FC } from "react";

const ViewCustomerPage: FC = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const { theme } = useDeskproAppTheme();
  const { client } = useDeskproAppClient();
  const { getCustomerLink } = useExternalLink();
  const { context } = useDeskproLatestAppContext<ContextData, Settings>()
  const { isLoading, customer } = useCustomer(customerId);
  const customerLink = useMemo(() => {
    return getCustomerLink(customer?.legacyResourceId);
  }, [getCustomerLink, customer?.legacyResourceId]);

  const isUsingOAuth = context?.settings.use_access_token !== true


  useSetTitle(customer?.displayName || "Shopify");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" })
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
    })

    if (customerLink) {
      registerElement("external", {
        type: "cta_external_link",
        url: customerLink,
        hasIcon: true,
      });
    }

    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [{
          title: "Switch Account",
          payload: {
            type: "changePage",
            path: `/login`,
          },
        }],
      });
    }

  }, [client, customer, context, context?.settings]);


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
