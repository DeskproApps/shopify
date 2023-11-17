import { useMemo, useCallback } from "react";
import get from "lodash/get";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useAsyncError } from "./useAsyncError";
import { getCustomers } from "../services/shopify";
import { getEntityCustomerList, setEntityCustomer } from "../services/deskpro";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DPUser, DPTicketUser } from "../types";

const checkIsLinkedCustomer = (client: IDeskproClient, userId: string): Promise<boolean> => {
    return getEntityCustomerList(client, userId)
        .then((customer) => !!customer.length)
        .catch(() => false);
};

const tryLinkCustomer = (
    client: IDeskproClient,
    user: DPUser|DPTicketUser,
    onLinked: () => void,
    onNoLinked: () => void,
): Promise<void> => {
    const email = get(user, ["email"]) || get(user, ["primaryEmail"]);
    return getCustomers(client, { email })
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
    const { context } = useDeskproLatestAppContext();
    const { asyncErrorHandler } = useAsyncError();
    const user = useMemo(() => {
      return get(context, ["data", "ticket", "primaryUser"]) || get(context, ["data", "user"]);
    }, [context]);

    const onLinkedCallback = useCallback(onLinkedItems, [onLinkedItems]);

    const onNoLinkedCallback = useCallback(onNoLinkedItems, [onNoLinkedItems]);

    useInitialisedDeskproAppClient((client) => {
        if (!user?.id) {
            return;
        }

        checkIsLinkedCustomer(client, user.id)
            .then((isLinkedCustomer) => !isLinkedCustomer
                ? tryLinkCustomer(client, user, onLinkedCallback, onNoLinkedCallback)
                : onLinkedCallback()
            )
            .catch(asyncErrorHandler)
    }, [user]);
};

export { useTryToLinkCustomer };
