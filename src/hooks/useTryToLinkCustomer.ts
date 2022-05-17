import { useEffect } from "react";
import { IDeskproClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
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

// ToDo: import types from @deskpro/app-sdk
type User = {
    id: string,
    email: string,
};

const tryLinkCustomer = (
    client: IDeskproClient,
    user: User,
    onLinkedItems: () => void,
    onNoLinkedItems: () => void,
): void => {
    getCustomers(client, { email: user.email })
        .then(({ customers }) => {
            if (customers.length === 1) {
                setEntityCustomer(client, user.id, customers[0].id)
                    .then(() => onLinkedItems())
                    .catch(() => onNoLinkedItems());
            } else {
                onNoLinkedItems()
            }
        })
};

const useTryToLinkCustomer = (
    onLinkedItems: () => void,
    onNoLinkedItems: () => void,
) => {
    const { client } = useDeskproAppClient();
    const [state] = useStore();
    const primaryUser = state.context?.data.ticket?.primaryUser;

    useEffect(() => {
        if (!client || !primaryUser?.id) {
            return
        }

        checkIsLinkedCustomer(client, primaryUser.id)
            .then((isLinkedCustomer) => {
                if (!isLinkedCustomer) {
                    tryLinkCustomer(client, primaryUser, onLinkedItems, onNoLinkedItems)
                } else {
                    onLinkedItems();
                }
            })
    }, [client, primaryUser, onLinkedItems, onNoLinkedItems]);
};

export { useTryToLinkCustomer };
