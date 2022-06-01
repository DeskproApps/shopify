import { useEffect } from "react";
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
    onLinkedItems: () => void,
    onNoLinkedItems: () => void,
): void => {
    getCustomers(client, { email: user.email })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then(({ customers }) => {
            if (customers.length === 1) {
                const customerId: string = customers[0].id as unknown as string;

                setEntityCustomer(client, user.id, customerId)
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

    const user = state.context?.data.ticket?.primaryUser || state.context?.data.user;

    useEffect(() => {
        if (!client || !user?.id) {
            return
        }

        checkIsLinkedCustomer(client, user.id)
            .then((isLinkedCustomer) => {
                if (!isLinkedCustomer) {
                    tryLinkCustomer(client, user, onLinkedItems, onNoLinkedItems)
                } else {
                    onLinkedItems();
                }
            })
    }, [
        client,
        user,
        onLinkedItems,
        onNoLinkedItems,
    ]);
};

export { useTryToLinkCustomer };
