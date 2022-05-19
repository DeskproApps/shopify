import { FC, ChangeEvent, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
    Button,
    HorizontalDivider,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { setEntityCustomer } from "../services/entityAssociation";
import { getCustomers } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";
import { Customer } from "../components/Customer";
import { NoFound } from "../components/NoFound";
import { InputSearch } from "../components/InputSearch";

export const LinkCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

    useEffect(() => {
        client?.setTitle("Link Customer");
        client?.registerElement("myRefreshButton", { type: "refresh_button" });
    }, [client, state]);

    const searchInShopify = useDebouncedCallback<(q: string) => void>((q) => {
        if (!client) {
            return;
        }

        if (!q || q.length < 2) {
            setCustomers([]);
            return;
        }

        getCustomers(client, { querySearch: q })
            .then(({ customers }: { customers: [] }) => {
                if (Array.isArray(customers)) {
                    setCustomers(customers);
                }
            })
            .catch(() => {});
    }, 500);

    const onClearSearch = () => {
        setSearchQuery('');
        setCustomers([]);
    };

    const onChangeSearch = ({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(q);
        searchInShopify(q);
    };

    const onChangeSelectedCustomer = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedCustomerId(e.target.value);
    }

    const onAdd = () => {
        if (!client) {
            return;
        }

        const user = state.context?.data.ticket?.primaryUser || state.context?.data.user;

        setEntityCustomer(client, user.id, selectedCustomerId)
            .then(() => dispatch({ type: "changePage", page: "home" }))
            .catch((error: Error) => {
                dispatch({ type: "error", error });
            });
    };

    return (
        <>
            <InputSearch
                value={searchQuery}
                onClear={onClearSearch}
                onChange={onChangeSearch}
            />
            {!!customers.length && customers.map((customer) => (
                <Customer
                    {...customer}
                    key={customer.id}
                    checked={selectedCustomerId === String(customer.id)}
                    onChange={onChangeSelectedCustomer}
                />
            ))}
            <HorizontalDivider style={{ margin: "10px 0" }} />
            {!customers.length && <NoFound />}
            <footer style={{ margin: "14px 0 8px" }}>
                <Button text="Add" onClick={onAdd} />
                <Button
                    text="Add"
                    onClick={() => dispatch({ type: "changePage", page: "home" })}
                />
            </footer>
        </>
    )
};
