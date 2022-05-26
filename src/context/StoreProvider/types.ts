import { Reducer } from "react";
import { Context, User } from "@deskpro/app-sdk";
import { CustomerType } from "../../services/shopify/types";

export type Page =
    "home"
    | "link_customer"
    | "view_customer"
    | "edit_customer"
    | "list_orders"
    | "view_order"
    | "edit_order";

export interface State {
    page?: Page;
    pageParams?: object;
    context?: Context,
    customer?: CustomerType,
    _error?: Error | unknown;
}

export type Action =
    | { type: "changePage", page: Page, params?: object }
    | { type: "loadContext", context: Context }
    | { type: "error", error: Error }
    | { type: "linkedCustomer", customer: CustomerType };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;

export type AppElementPayload = undefined | {
    type: "changePage",
    page: Page
};

// ToDo: create typing from different Context type @deskpro/app-sdk/esm/client/types.d.ts
export type UserType = User & {
    id: string,
};
