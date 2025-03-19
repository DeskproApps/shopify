import { useState, useEffect, useCallback} from "react";
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
import { ContextData, Settings } from "@/types";

const LinkCustomerPage: FC = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [searchParams] = useSearchParams();
    const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerType["id"]>("");
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<ContextData, Settings>();
    const { isLoading, customers } = useSearch(search);
    const customerId =  searchParams.get("customerId")
    const dpUser = context?.data?.ticket?.primaryUser || context?.data?.user
    const navigate = useNavigate();

    useSetTitle("Link Customer");

  const isUsingOAuth = context?.settings?.use_access_token !== true || context.settings.use_advanced_connect === false

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });

        if (isEditMode) {
            registerElement("home", {
                type: "home_button",
                payload: { type: "changePage", path: "/home" }
            });
        }

        if (isUsingOAuth) {
            registerElement("menu", {
              type: "menu",
              items: [{
                title: "Logout",
                payload: {
                  type: "changePage",
                  path: `/logout`,
                },
              }],
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
