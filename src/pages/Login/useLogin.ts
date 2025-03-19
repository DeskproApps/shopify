import { ContextData, Settings } from "@/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getAccessToken, getShopInfo } from "@/services/shopify";
import { getEntityCustomerList } from "@/services/deskpro";
import { IOAuth2, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { OAUTH2_ACCESS_TOKEN_PATH, OAUTH2_REFRESH_TOKEN_PATH } from "@/constants";
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
    const [isPolling, setIsPolling] = useState(false)
    const [oAuth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)
    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<ContextData, Settings>()
    const isUsingOAuth = context?.settings?.use_access_token !== true || context.settings.use_advanced_connect === false
    const user = context?.data?.ticket?.primaryUser || context?.data?.user

    useInitialisedDeskproAppClient(async (client) => {
        if (!user) {
            return
        }

        // Ensure they aren't using access tokens
        if (!isUsingOAuth) {
            setError("Enable OAuth to access this page");
            return

        }
        const mode = context?.settings.use_advanced_connect === false ? 'global' : 'local';

        const clientId = context?.settings.client_id;
        if (mode === 'local' && typeof clientId !== 'string') {
            // Local mode requires a clientId.
            setError("A client ID is required");
            return
        }
        const oAuth2Response = mode === "local" ?
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
                    const url = new URL(oAuth2Response.authorizationUrl);
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

        setAuthUrl(oAuth2Response.authorizationUrl)
        setOAuth2Context(oAuth2Response)

    }, [setAuthUrl, context?.settings.use_advanced_connect])

    useInitialisedDeskproAppClient((client) => {
        if (!user || !oAuth2Context) {
            return
        }

        const startPolling = async () => {
            try {
                const result = await oAuth2Context.poll()

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
                    .catch(() => { navigate("/link_customer") })
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setIsLoading(false)
                setIsPolling(false)
            }
        }

        if (isPolling) {
            void startPolling()
        }
    }, [isPolling, user, oAuth2Context, navigate])

    const onSignIn = useCallback(() => {
        setIsLoading(true);
        setIsPolling(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}