import { Reducer } from "react";

export type Page =
    "home"
    | "link_customers"
    | "view_customer"
    | "edit_customer"
    | "list_orders"
    | "view_order"
    | "edit_order";

export interface State {
    page?: Page;
    pageParams?: object;
}

export type Action =
    | { type: "changePage", page: Page, params?: object };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;
