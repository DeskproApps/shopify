import { FC, ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useDeskproAppClient, Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { setEntityCustomer } from "../services/entityAssociation";
import { getCustomers } from "../services/shopify";
import { Customer } from "../components/Customer";

const NoResult = () => (
    <p>No matching customers found. Please try again.</p>
);

export const LinkCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [customers, setCustomers] = useState<[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const primaryUser = state.context?.data.ticket?.primaryUser;

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
    },500);

    const onChangeSearch = ({ target: { value: q } }: ChangeEvent<HTMLInputElement>) => {
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

        setEntityCustomer(client, primaryUser.id, selectedCustomerId)
            .then(() => dispatch({ type: "changePage", page: "home" }))
            // ToDo: handle error
            .catch(() => {});
    };

    return (
        <>
            <h1>LinkCustomer</h1>
            <input type="text" value={searchQuery} onChange={onChangeSearch}/>
            {!customers.length
                ? <NoResult/>
                : customers.map((customer) => (
                    <Customer {...customer} onChange={onChangeSelectedCustomer} />
                ))
            }
            <Button text="Add" onClick={onAdd} />
        </>
    )
};
