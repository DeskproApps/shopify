import { Reducer } from "react";
import { Context } from "@deskpro/app-sdk";

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
}

export type Action =
    | { type: "changePage", page: Page, params?: object }
    | { type: "loadContext", context: Context };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;
