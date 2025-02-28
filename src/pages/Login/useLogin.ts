import { ContextData, Settings } from "@/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getAccessToken, getShopInfo } from "@/services/shopify";
import { getEntityCustomerList } from "@/services/deskpro";
import { OAUTH2_ACCESS_TOKEN_PATH, OAUTH2_REFRESH_TOKEN_PATH } from "@/constants";
import { OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useCallback, useState } from "react";

interface UseLogin {
    onSignIn: () => void,
    authUrl: string | null,
    error: null | string,
    isLoading: boolean,
};

export default function useLogin(): UseLogin {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<ContextData, Settings>()

    const user = context?.data?.ticket?.primaryUser || context?.data?.user


    useInitialisedDeskproAppClient(async (client) => {
        if (context?.settings.use_deskpro_saas === undefined || !user) {
            // Make sure settings have loaded.
            return
        }

        // Ensure they aren't using access tokens
        if (context.settings.use_access_token === true) {
            setError("Enable OAuth to access this page");
            return

        }
        const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

        const clientId = context?.settings.client_id;
        if (mode === 'local' && typeof clientId !== 'string') {
            // Local mode requires a clientId.
            setError("A client ID is required");
            return
        }
        const oauth2 = mode === "local" ?
            await client.startOauth2Local(
                ({ state, callbackUrl }) => {
                    return `https://${context?.settings.shop_name}.myshopify.com/admin/oauth/authorize?${createSearchParams([
                        ["client_id", clientId ?? ""],
                        ["state", state],
                        ["redirect_uri", callbackUrl],
                        ["scope", "read_inventory,write_assigned_fulfillment_orders,read_assigned_fulfillment_orders,write_customers,read_customers,write_draft_orders,read_draft_orders,write_order_edits,read_order_edits,write_orders,read_orders,write_product_listings,read_product_listings,write_products,read_products"]
                    ])}`
                },
                /\bcode=(?<code>[^&#]+)/,
                async (code: string): Promise<OAuth2Result> => {
                    // Extract the callback URL from the authorization URL
                    const url = new URL(oauth2.authorizationUrl);
                    const redirectUri = url.searchParams.get("redirect_uri");

                    if (!redirectUri) {
                        throw new Error("Failed to get callback URL");
                    }

                    const data = await getAccessToken(client, code);

                    return { data }
                }
            )
            // Global Proxy Service
            : await client.startOauth2Global("0ad23fa9caf394119372cd5db27dba4b");

        setAuthUrl(oauth2.authorizationUrl)
        setIsLoading(false)

        try {
            const result = await oauth2.poll()

            await client.setUserState(OAUTH2_ACCESS_TOKEN_PATH, result.data.access_token, { backend: true })

            if (result.data.refresh_token) {
                await client.setUserState(OAUTH2_REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true })
            }

            const shopResult = await getShopInfo(client)

            if (!shopResult?.data?.shop) {
                throw new Error("Error authenticating user")
            }

            getEntityCustomerList(client, user.id)
            .then((customers) => {
                customers.length < 1 ? navigate("/link_customer") :
                    navigate("/home")
            })
            .catch(() => {})
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            setIsLoading(false);
        }
    }, [setAuthUrl, context?.settings.use_deskpro_saas])

    const onSignIn = useCallback(() => {
        setIsLoading(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}