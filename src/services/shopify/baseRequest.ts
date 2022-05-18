import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { ApiRequestMethod } from "./types";

/**
 * Base request service
 */
const baseRequest = async (
    client: IDeskproClient,
    url: string,
    method: ApiRequestMethod = 'GET'
) => {
    const dpFetch = await proxyFetch(client);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Shopify-Access-Token": placeholders.ACCESS_TOKEN,
    };

    const res = await dpFetch(`${BASE_URL}${url}`, { method, headers });

    if (res.status === 400) {
        return res.json();
    }

    if (res.status < 200 || res.status >= 400) {
        throw new Error(`${method} ${BASE_URL}${url}: Response Status [${res.status}]`);
    }

    try {
        return await res.json();
    } catch (e) {
        return {};
    }
};

export { baseRequest };
