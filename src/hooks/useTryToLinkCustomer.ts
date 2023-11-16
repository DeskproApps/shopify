import { useState, useEffect, useCallback } from "react";
import get from "lodash/get";
import { IDeskproClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { UserType } from "../context/StoreProvider/types";
import { getCustomers } from "../services/shopify";
import { getEntityCustomerList, setEntityCustomer } from "../services/deskpro";

const checkIsLinkedCustomer = (client: IDeskproClient, userId: string): Promise<boolean> => {
    return getEntityCustomerList(client, userId)
        .then((customer) => !!customer.length)
        .catch(() => false);
};

const tryLinkCustomer = (
    client: IDeskproClient,
    user: UserType,
    onLinked: () => void,
    onNoLinked: () => void,
): Promise<void> => {
    return getCustomers(client, { email: user.email })
        .then(({ customers }) => {
            if (customers.length === 1) {
                const customerId = customers[0].id;

                return setEntityCustomer(client, user.id, customerId)
                    .then(onLinked)
                    .catch(onNoLinked);
            } else {
                return onNoLinked()
            }
        })
};

const useTryToLinkCustomer = (
    onLinkedItems: () => void,
    onNoLinkedItems: () => void,
) => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(true);

    const user = state.context?.data.ticket?.primaryUser || state.context?.data.user;

    const onLinkedCallback = useCallback(() => {
        setLoading(false);
        onLinkedItems();
    }, [onLinkedItems]);

    const onNoLinkedCallback = useCallback(() => {
        setLoading(false);
        onNoLinkedItems();
    }, [onNoLinkedItems]);

    useEffect(() => {
        if (!client || !user?.id) {
            return
        }

        checkIsLinkedCustomer(client, user.id)
            .then((isLinkedCustomer) => {
                if (!isLinkedCustomer) {
                    return tryLinkCustomer(client, user, onLinkedCallback, onNoLinkedCallback)
                } else {
                    return onLinkedCallback();
                }
            })
            .catch((err) => {
                dispatch({ type: "error", error: get(err, ["errors"], err) });
            })
            .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, user?.id]);

    return { loading };
};

export { useTryToLinkCustomer };
