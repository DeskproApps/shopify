import {useState, useEffect, useCallback} from "react";
import { IDeskproClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { UserType } from "../context/StoreProvider/types";
import { getCustomers } from "../services/shopify";
import { getEntityCustomerList, setEntityCustomer } from "../services/entityAssociation";

const checkIsLinkedCustomer = (client: IDeskproClient, userId: string): Promise<boolean> => {
    return getEntityCustomerList(client, userId)
        .then((customer) => {
            return !!customer.length;
        })
        .catch(() => {
            return false
        });
};

const tryLinkCustomer = (
    client: IDeskproClient,
    user: UserType,
    onLinked: () => void,
    onNoLinked: () => void,
): void => {
    getCustomers(client, { email: user.email })
        .then(({ customers }) => {
            if (customers.length === 1) {
                const customerId = customers[0].id;

                setEntityCustomer(client, user.id, customerId)
                    .then(onLinked)
                    .catch(onNoLinked);
            } else {
                onNoLinked()
            }
        })
};

const useTryToLinkCustomer = (
    onLinkedItems: () => void,
    onNoLinkedItems: () => void,
) => {
    const { client } = useDeskproAppClient();
    const [state] = useStore();
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
                    tryLinkCustomer(client, user, onLinkedCallback, onNoLinkedCallback)
                } else {
                    onLinkedCallback();
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, user?.id]);

    return { loading };
};

export { useTryToLinkCustomer };
