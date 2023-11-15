import { FC, ChangeEvent, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import {
    setEntityCustomer,
    getEntityCustomerList,
    deleteAllEntityCustomer,
} from "../../services/entityAssociation";
import { getCustomers } from "../../services/shopify";
import { CustomerType } from "../../services/shopify/types";
import { LinkCustomer } from "../../components";

const LinkCustomerPage: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("customerId") as CustomerType["id"];
    const [state] = useStore();
    const { client } = useDeskproAppClient();
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerType["id"]>("");
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useSetTitle("Link Customer");

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });

        if (isEditMode) {
            registerElement("home", {
                type: "home_button",
                payload: { type: "changePage", path: "/home" }
            });
        }
    }, [isEditMode]);

    useEffect(() => {
        if (customerId) {
            setSelectedCustomerId(customerId);
            setIsEditMode(true);
        }
    }, [customerId]);

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

    const onChangeSearch = (q: string) => {
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
                    navigate("/home");
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
                    client?.deregisterElement("home");
                } else {
                    navigate("/home");
                }
            })
            .finally(() => setLoading(false));
    };

    const onCancel = () => navigate("/home");

    return (
      <LinkCustomer
        onSave={onSave}
        onCancel={onCancel}
        isLoading={loading}
        customers={customers}
        isEditMode={isEditMode}
        onChangeSearch={onChangeSearch}
        selectedCustomerId={selectedCustomerId}
        onChangeSelectedCustomer={onChangeSelectedCustomer}
      />
    )
};

export { LinkCustomerPage };
