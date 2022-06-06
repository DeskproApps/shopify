import { Reducer } from "react";
import { Context, User } from "@deskpro/app-sdk";
import {CustomerType, Order, Orders} from "../../services/shopify/types";

export type Page =
    "home"
    | "link_customer"
    | "view_customer"
    | "edit_customer"
    | "list_orders"
    | "view_order"
    | "edit_order";

export type OrderPageParams = { orderId: Order['id'] };

export type PageParams =
    | OrderPageParams;

export interface State {
    page?: Page;
    pageParams?: JSX.IntrinsicAttributes & PageParams,
    context?: Context,
    customer?: CustomerType,
    orders?: Orders,
    _error?: Error | unknown;
}

export type Action =
    | { type: "changePage", page: Page, params?: PageParams }
    | { type: "loadContext", context: Context }
    | { type: "error", error: Error }
    | { type: "linkedCustomer", customer: CustomerType }
    | { type: "linkedOrders", orders: Orders };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;

export type AppElementPayload = undefined | {
    type: "changePage",
    page: Page
};

export type UserType = User & {
    id: string,
};
