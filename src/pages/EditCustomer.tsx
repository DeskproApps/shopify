import { FC, useState, useEffect } from "react";
import get from "lodash/get";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getCustomer } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";
import { EditCustomerForm } from "../components/EditCustomer";
import { Loading } from "../components/common";

export const EditCustomer: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);

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

        getCustomer(client, state.pageParams.customerId)
            .then(({ customer }) => {
                setLoading(false);
                setCustomer(customer);
            })
            .catch((error) => dispatch({ type: "error", error: get(error, ["errors"], error) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state.pageParams?.customerId]);

    return (loading || !customer)
        ? (<Loading />)
        : (<EditCustomerForm {...customer} />);
};
