import { FC, useState, useEffect } from "react";
import get from "lodash/get";
import { useSearchParams } from "react-router-dom";
import {
    LoadingSpinner,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { getShopName } from "../../utils";
import { getCustomer } from "../../services/shopify";
import { ViewCustomer } from "../../components";
import { CustomerType } from "../../services/shopify/types";

const ViewCustomerPage: FC = () => {
    const [searchParams] = useSearchParams();
    const { theme } = useDeskproAppTheme();
    const customerId = searchParams.get("customerId") as CustomerType["id"];
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [loading, setLoading] = useState<boolean>(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const shopName = getShopName(state);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

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

        if (shopName) {
            registerElement("external", {
                type: "cta_external_link",
                url: `https://${shopName}.myshopify.com/admin/customers/${customer?.legacyResourceId}`,
                hasIcon: true,
            });
        }
    }, [client, customer]);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!customerId) {
            dispatch({ type: "error", error: "CustomerId not found" });
            return;
        }

        getCustomer(client, customerId)
            .then(({ customer }) => setCustomer(customer))
            .catch((error: Error) => dispatch({ type: "error", error: get(error, ["errors"], error) }))
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    if (loading) {
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
