import { FC, useState, useEffect } from "react";
import { Button, H1, useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";
import { getFullName } from "../utils";

export const Home: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useEffect(() => {
        client?.setTitle("Shopify Customer");
    }, [client, state])

    useEffect(() => {
        if (!client) {
            return;
        }

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                setCustomer(customer);
            })
            .catch((err) => console.log('>>> home:catch:', err));
    }, [client, userId]);

    return (
        <>
            <H1>{getFullName({ firstName: customer?.first_name, lastName: customer?.last_name, })}</H1>
            <br/>
            <Button
                text="toListOrder"
                onClick={() => dispatch({ type: "changePage", page: "list_orders" })}
            />
            &nbsp;
            <Button
                text="toViewCustomer"
                onClick={() => dispatch({ type: "changePage", page: "view_customer" })}
            />
        </>
    );
};
