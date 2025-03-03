import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import isString from "lodash";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { GRAPHQL_URL, placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import { ShopifyError } from "./ShopifyError";
import type { Request } from "../../types";

const baseGraphQLRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "POST",
  queryParams = {},
  settings = {},
  headers: customHeaders,
}) => {
  const isAdmin = settings?.shop_name && settings?.access_token;
  const dpFetch = await (isAdmin ? adminGenericProxyFetch : proxyFetch)(client);

  const baseUrl = rawUrl ? rawUrl : `${GRAPHQL_URL(settings?.shop_name)}${url || ""}`;
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;
  const options: RequestInit = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": settings?.access_token || placeholders.ACCESS_TOKEN,
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.body = isString(data) ? data as string : JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new ShopifyError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  if (has(result, ["errors"])) {
    throw new ShopifyError({
      data: result,
      status: res.status,
    });
  } else {
    return result;
  }
};

export { baseGraphQLRequest };
