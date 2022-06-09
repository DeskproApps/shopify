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
import { Customer, InputSearch } from "../components/LinkCustomer";
import { NoFound } from "../components/common";

export const LinkCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

    useEffect(() => {
        client?.setTitle("Link Customer");

        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        // no linked customers
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        // client?.registerElement("shopifySettingsButton");

        // already a linked customer
        // client?.registerElement("shopifyHomeButton", {
        //     type: "home_button",
        //     payload: { type: "changePage", page: "home" }
        // });
        // client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
        // client?.registerElement("shopifySettingsButton");
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
            .then(({ customers }) => {
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
            .catch((error: Error) => dispatch({ type: "error", error }));
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
                    checked={selectedCustomerId === customer.id}
                    onChange={onChangeSelectedCustomer}
                />
            ))}
            <HorizontalDivider style={{ margin: "10px 0" }} />
            {!customers.length && <NoFound text="No matching customers found. Please try again." />}
            <footer style={{ margin: "14px 0 8px" }}>
                <Button disabled={!selectedCustomerId} text="Add" onClick={onAdd} />
            </footer>
        </>
    )
};
