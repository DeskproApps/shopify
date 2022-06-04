import { FC, useState, useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getCustomer } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";
import { EditCustomerForm } from "../components/EditCustomer";

export const EditCustomer: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        client?.setTitle("Edit Customer Details");

        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyRefreshButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyMenu");

        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
    }, [client]);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!state.pageParams?.customerId) {
            dispatch({ type: "error", error: "CustomerId not found" });
            return;
        }

        if (state?.customer && state.customer.id === state.pageParams.customerId) {
            setLoading(false);
            return;
        }

        getCustomer(client, state.pageParams.customerId)
            .then(({ customer }) => {
                setLoading(false);
                dispatch({ type: "linkedCustomer", customer });
            })
            .catch((error) => dispatch({ type: "error", error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state.pageParams?.customerId]);

    return (loading || !state.customer)
        ? (<>Loading...</>)
        : (<EditCustomerForm {...state.customer as CustomerType} />);
};
