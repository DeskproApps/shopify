import { FC, useEffect } from "react";
import { match } from "ts-pattern";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    DeskproAppTheme,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { Tag, Toggle } from "@deskpro/deskpro-ui";
import { useStore } from "../context/StoreProvider/hooks";
import { TextBlockWithLabel } from "../components/common";
import { getShopName } from "../utils";
import { useSetFullNameInTitle } from "../hooks";
import { getEntityCustomerList } from "../services/entityAssociation";
import { getCustomer } from "../services/shopify";

const getTagColorSchemaMatch = (theme: DeskproAppTheme['theme'], tag: string) => {
    return match(tag.trim().toLowerCase())
        .with('vip', () => ({
            borderColor: theme.colors.orange100,
            backgroundColor: theme.colors.orange10,
        }))
        .with('development', () => ({
            borderColor: theme.colors.turquoise100,
            backgroundColor: theme.colors.turquoise10,
        }))
        .otherwise(() => ({
            borderColor: theme.colors.grey80,
            backgroundColor: theme.colors.grey10,
        }));
};

export const ViewCustomer: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
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
                url: `https://${shopName}.myshopify.com/admin/customers/${state.customer?.legacyResourceId}`,
                hasIcon: true,
            });
        }
        client?.registerElement("shopifyHomeButton", {
            type: "home_button",
            payload: { type: "changePage", page: "home" }
        });
        client?.registerElement("shopifyEditButton", {
            type: "edit_button",
            payload: { type: "changePage", page: "edit_customer" },
        });
        client?.registerElement("shopifyRefreshButton", { type: "refresh_button" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state]);

    useEffect(() => {
        if (!client) {
            return;
        }

        if (!state.customer) {
            getEntityCustomerList(client, userId)
                .then((customers: string[]) => {
                    debugger
                    return getCustomer(client, customers[0]);
                })
                .then(({ customer }) => {
                    debugger;
                    dispatch({ type: "linkedCustomer", customer })
                })
                .catch((error: Error) => dispatch({ type: "error", error }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    return (
        <>
            <TextBlockWithLabel
                label="Email"
                text={state.customer?.email}
            />
            <TextBlockWithLabel
                label="Phone number"
                text={state.customer?.phone || '-'}
            />
            <TextBlockWithLabel
                label="Tags"
                text={(
                    <Stack gap={6} wrap="wrap">
                        {state.customer?.tags.map((tag) => (
                            <Tag
                                key={tag}
                                color={{
                                    ...getTagColorSchemaMatch(theme, tag),
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
                        checked={state.customer?.emailMarketingConsent.marketingState === "SUBSCRIBED"}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Customer Note"
                text={state.customer?.note || '-'}
            />
        </>
    );
};
