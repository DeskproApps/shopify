import { FC, useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { Tag, Toggle } from "@deskpro/deskpro-ui";
import { useStore } from "../context/StoreProvider/hooks";
import { TextBlockWithLabel } from "../components/common";
import { getShopName, getTagColorSchema } from "../utils";
import { useSetFullNameInTitle } from "../hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";
import { CustomerType } from "../services/shopify/types";

export const ViewCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const shopName = getShopName(state);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useSetFullNameInTitle();

    useEffect(() => {
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyHomeButton");
        client?.deregisterElement("shopifyRefreshButton");

        if (shopName) {
            client?.registerElement("shopifyExternalCtaLink", {
                type: "cta_external_link",
                url: `https://${shopName}.myshopify.com/admin/customers/${customer?.legacyResourceId}`,
                hasIcon: true,
            });
        }
        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        client?.registerElement("shopifyEditButton", {
            type: "edit_button",
            payload: { type: "changePage", page: "edit_customer", params: { customerId: customer?.id } },
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state.customer]);

    useEffect(() => {
        if (!client) {
            return;
        }

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                client?.setTitle(customer.displayName);
                setCustomer(customer);
            })
            .catch((error: Error) => dispatch({ type: "error", error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    return (
        <>
            <TextBlockWithLabel
                label="Email"
                text={customer?.email}
            />
            <TextBlockWithLabel
                label="Phone number"
                text={customer?.phone || '-'}
            />
            <TextBlockWithLabel
                label="Tags"
                text={(
                    <Stack gap={6} wrap="wrap">
                        {customer?.tags.map((tag) => (
                            <Tag
                                key={tag}
                                color={{
                                    ...getTagColorSchema(theme, tag),
                                    textColor: theme.colors.grey100,
                                }}
                                label={tag}
                                closeIcon={faTimes}
                            />
                        ))}
                    </Stack>
                )}
            />
            <TextBlockWithLabel
                label="Receive Marketing Email"
                text={(
                    <Toggle
                        disabled
                        label="Yes"
                        checked={customer?.emailMarketingConsent.marketingState === "SUBSCRIBED"}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Customer Note"
                text={customer?.note || '-'}
            />
        </>
    );
};
