import type { To, ParamKeyValuePair } from "react-router-dom";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Response } from "./services/shopify/types";

/** Common types */
export type Maybe<T> = T | undefined | null;
export type Dict<T> = Record<string, T>;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  data?: Dict<string>|RequestInit["body"];
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
  settings?: Maybe<Settings>,
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<T>;

/** Deskpro types */
export type Settings = {
  shop_name?: string,
  access_token?: string,
};

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
;

export type DPUser = {
  emails: string[],
  firstName: string,
  id: string,
  isAgent: boolean,
  isConfirmed: boolean,
  isDisabled: boolean,
  language: string,
  lastName: string,
  locale: string,
  name: string,
  primaryEmail: string,
  titlePrefix: string,
};

export type DPTicketUser = {
  displayName: string,
  email: string,
  emails: string[],
  firstName: string,
  id: string,
  language: string,
  lastName: string,
  locale: string,
};
