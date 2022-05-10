import { proxyFetch, IDeskproClient } from "@deskpro/app-sdk";
import { ApiRequestMethod } from './types';

/**
 * Get shop info service
 */
export const getShopInfo = (client: IDeskproClient) => {
    return request(client, "https://__shop_name__.myshopify.com/admin/api/2022-04/shop.json")
};

/**
 * Base request service
 */
const request = async (
    client: IDeskproClient,
    url: string,
    method: ApiRequestMethod = 'GET'
) => {
    const dpFetch = await proxyFetch(client);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Shopify-Access-Token": "__access_token__",
    };

    const res = await dpFetch(url, { method, headers });

    if (res.status === 400) {
        return res.json();
    }

    if (res.status < 200 || res.status >= 400) {
        throw new Error(`${method} ${url}: Response Status [${res.status}]`);
    }

    try {
        return await res.json();
    } catch (e) {
        return {};
    }
};
