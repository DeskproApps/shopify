import { FC, useState, useEffect } from "react";
import get from "lodash/get";
import { useSearchParams } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements, useSetTitle } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { getCustomer } from "../../services/shopify";
import { CustomerType } from "../../services/shopify/types";
import { EditCustomerForm } from "../../components/EditCustomer";

const EditCustomerPage: FC = () => {
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("customerId") as CustomerType["id"];
    const { client } = useDeskproAppClient();
    const [, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);

    useSetTitle("Edit Customer");

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    }, [client]);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!customerId) {
            dispatch({ type: "error", error: "CustomerId not found" });
            return;
        }

        getCustomer(client, customerId)
            .then(({ customer }) => {
                setLoading(false);
                setCustomer(customer);
            })
            .catch((error) => dispatch({ type: "error", error: get(error, ["errors"], error) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, customerId]);

    return (loading || !customer)
        ? (<LoadingSpinner />)
        : (<EditCustomerForm {...customer} />);
};

export { EditCustomerPage };
