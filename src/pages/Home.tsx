import { FC, useState, useEffect } from "react";
import { Button, useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { Customer } from "../services/shopify/types";

export const Home: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [customerId, setCustomerId] = useState<string | null>(null);
    const primaryUserId = state.context?.data.ticket?.primaryUser.id;

    useEffect(() => {
        if (!client) {
            return;
        }

        getEntityCustomerList(client, primaryUserId)
            .then((customers: Array<Customer['id']>) => {
                setCustomerId(customers[0]);
            })
    }, [client, primaryUserId]);

    return (
        <>
            <h1>Home: {customerId}</h1>
            <Button
                text="toListOrder"
                onClick={() => dispatch({ type: "changePage", page: "list_orders" })}
            />
            <Button
                text="toViewCustomer"
                onClick={() => dispatch({ type: "changePage", page: "view_customer" })}
            />
        </>
    );
};
