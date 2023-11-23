import {useMemo, useState, useEffect, useCallback} from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import {
    setEntityCustomer,
    getEntityCustomerList,
    deleteAllEntityCustomer,
} from "../../services/deskpro";
import { useSearch } from "./hooks";
import { LinkCustomer } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { CustomerType } from "../../services/shopify/types";

const LinkCustomerPage: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext();
    const [search, setSearch] = useState<string>("");
    const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerType["id"]>("");
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { isLoading, customers } = useSearch(search);
    const customerId = useMemo(() => searchParams.get("customerId"), [searchParams]);
    const dpUser = useMemo(() => {
      return get(context, ["data", "ticket", "primaryUser"])
        || get(context, ["data", "user"])
    }, [context]);

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

    const onChangeSearch = useDebouncedCallback(setSearch, 1000);

    const onChangeSelectedCustomer = ({ target: { value: customerId } }: ChangeEvent<HTMLInputElement>) => {
        if (selectedCustomerId === customerId) {
            setSelectedCustomerId('');
        } else {
            setSelectedCustomerId(customerId);
        }
    }

    const onSave = useCallback(() => {
        if (!client || !dpUser?.id) {
            return;
        }

        setIsSubmitting(true);

        getEntityCustomerList(client, dpUser.id)
            .then((customerIds) => {
                if ((customerIds.length === 1) && (customerIds[0] === selectedCustomerId)) {
                    navigate("/home");
                } else  {
                    return deleteAllEntityCustomer(client, dpUser.id, customerIds);
                }
            })
            .then(() => {
                if (!isEmpty(selectedCustomerId)) {
                    return setEntityCustomer(client, dpUser.id, selectedCustomerId);
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
            .finally(() => setIsSubmitting(false));
    }, [client, dpUser, navigate, selectedCustomerId]);

    const onCancel = () => navigate("/home");

    return (
      <LinkCustomer
        onSave={onSave}
        onCancel={onCancel}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        customers={customers}
        isEditMode={isEditMode}
        onChangeSearch={onChangeSearch}
        selectedCustomerId={selectedCustomerId}
        onChangeSelectedCustomer={onChangeSelectedCustomer}
      />
    )
};

export { LinkCustomerPage };
