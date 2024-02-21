import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner, useDeskproAppClient } from "@deskpro/app-sdk";
import { PageBuilder } from "@deskpro/app-builder";
import {
  useSetTitle,
  useExternalLink,
  useRegisterElements,
} from "../../hooks";
import { useCustomer } from "../../hooks";
import type { FC } from "react";

const ViewCustomerPage: FC = () => {
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("customerId");
    const { client } = useDeskproAppClient();
    const { getCustomerLink } = useExternalLink();
    const { isLoading, customer } = useCustomer(customerId);
    const customerLink = useMemo(() => {
      return getCustomerLink(customer?.legacyResourceId);
    }, [getCustomerLink, customer?.legacyResourceId]);

    useSetTitle("Shopify");

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
    }, [client, customer]);


    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
      <>ViewCustomerPage</>
    );
    // return (
    //   <PageBuilder
    //     store={{ customer }}
    //     config={{
    //       structure: [
    //         ["fullName"],
    //         ["email"],
    //         ["phone"],
    //         ["tags"],
    //         ["marketingEmail"],
    //         ["note"],
    //       ],
    //       blocks: {
    //         fullName: {
    //           type: "title",
    //           pathInStore: ["customer", "displayName"],
    //           props: {
    //             link: `${customerLink}`,
    //           },
    //         },
    //         email: {
    //           type: "text",
    //           label: "Email",
    //           pathInStore: ["customer", "email"],
    //         },
    //         phone: {
    //           type: "text",
    //           label: "Phone number",
    //           pathInStore: ["customer", "phone"],
    //         },
    //         tags: {
    //           type: "tags",
    //           label: "Tags",
    //           pathInStore: ["customer", "tags"],
    //         },
    //         marketingEmail: {
    //           type: "toggle",
    //           label: "Receive Marketing Email",
    //           pathInStore: ["customer", "emailMarketingConsent", "marketingState"],
    //           props: {
    //             disabled: true,
    //             label: "Yes",
    //             rules: {
    //               eq: "SUBSCRIBED",
    //             },
    //           },
    //         },
    //         note: {
    //           type: "text",
    //           label: "Note",
    //           pathInStore: ["customer", "note"],
    //         },
    //       },
    //     }}
    //   />
    // );
};

export { ViewCustomerPage };
