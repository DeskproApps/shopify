import { Reducer } from "react";
import { Context, User } from "@deskpro/app-sdk";
import { CustomerType, Order, Orders } from "../../services/shopify/types";

export type ErrorType = Error | string | unknown;

export type Page =
    "home"
    | "link_customer"
    | "view_customer"
    | "edit_customer"
    | "list_orders"
    | "view_order"
    | "edit_order";

export type PageParams = {
    orderId?: Order['id'],
    customerId?: CustomerType['id'],
};

export interface State {
    page?: Page;
    pageParams?: PageParams,
    context?: Context,
    customer?: CustomerType,
    orders?: Orders,
    _error?: ErrorType,
}

export type Action =
    | { type: "changePage", page: Page, params?: PageParams }
    | { type: "loadContext", context: Context }
    | { type: "error", error: ErrorType }
    | { type: "linkedCustomer", customer: CustomerType }
    | { type: "linkedOrders", orders: Orders };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;

export type AppElementPayload = undefined | {
    type: "changePage",
    page: Page,
    params?: PageParams,
};

export type UserType = User & {
    id: string,
};
