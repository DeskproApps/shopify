import { FC, ChangeEvent, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useDebouncedCallback } from "use-debounce";
import {
    HorizontalDivider,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import {
    setEntityCustomer,
    getEntityCustomerList,
    deleteAllEntityCustomer,
} from "../services/entityAssociation";
import { getCustomers } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";
import { Customer, InputSearch, Footer } from "../components/LinkCustomer";
import { NoFound, Loading } from "../components/common";

export const LinkCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerType['id']>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        client?.setTitle("Link Customer");

        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });

        if (isEditMode) {
            client?.registerElement("shopifyHomeButton", {
                type: "home_button",
                payload: { type: "changePage", page: "home" }
            });
        }
    }, [client, state, isEditMode]);

    useEffect(() => {
        if (state?.pageParams?.customerId) {
            setSelectedCustomerId(state.pageParams.customerId);
            setIsEditMode(true);
        }
    }, [state?.pageParams?.customerId]);

    const searchInShopify = useDebouncedCallback<(q: string) => void>((q) => {
        if (!client) {
            return;
        }

        if (!q || q.length < 2) {
            setCustomers([]);
            return;
        }

        setLoading(true);

        getCustomers(client, { querySearch: q })
            .then(({ customers }) => {
                if (Array.isArray(customers)) {
                    setCustomers(customers);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, 500);

    const onClearSearch = () => {
        setSearchQuery('');
        setCustomers([]);
    };

    const onChangeSearch = ({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(q);
        searchInShopify(q);
    };

    const onChangeSelectedCustomer = ({ target: { value: customerId } }: ChangeEvent<HTMLInputElement>) => {
        if (selectedCustomerId === customerId) {
            setSelectedCustomerId('');
        } else {
            setSelectedCustomerId(customerId);
        }
    }

    const onSave = () => {
        if (!client) {
            return;
        }

        const user = state.context?.data.ticket?.primaryUser || state.context?.data.user;

        setLoading(true);

        getEntityCustomerList(client, user.id)
            .then((customerIds) => {
                if ((customerIds.length === 1) && (customerIds[0] === selectedCustomerId)) {
                    // nothing change
                    dispatch({ type: "changePage", page: "home" });
                } else  {
                    return deleteAllEntityCustomer(client, user.id, customerIds);
                }
            })
            .then(() => {
                if (!isEmpty(selectedCustomerId)) {
                    return setEntityCustomer(client, user.id, selectedCustomerId);
                }

                return;
            })
            .then(() => {
                if (isEmpty(selectedCustomerId)) {
                    onClearSearch();
                    client?.deregisterElement("shopifyHomeButton");
                } else {
                    dispatch({ type: "changePage", page: "home" })
                }
            })
            .finally(() => setLoading(false));
    };

    const onCancel = () => dispatch({ type: "changePage", page: "home" });

    return (
        <>
            <InputSearch
                value={searchQuery}
                onClear={onClearSearch}
                onChange={onChangeSearch}
            />

            {loading
                ? <Loading />
                : (
                    <>
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
                    </>
                )
            }
            <Footer
                selectedId={selectedCustomerId}
                isEditMode={isEditMode}
                onSave={onSave}
                onCancel={onCancel}
            />
        </>
    )
};
