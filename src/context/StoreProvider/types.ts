import { Reducer } from "react";
import { Context, User } from "@deskpro/app-sdk";
import { CustomerType, Orders } from "../../services/shopify/types";

export type ErrorType = Error | string | unknown;

export interface State {
    context?: Context,
    customer?: CustomerType,
    orders?: Orders,
    _error?: ErrorType,
}

export type Action =
    | { type: "loadContext", context: Context }
    | { type: "error", error: ErrorType }
    | { type: "linkedCustomer", customer: CustomerType }
    | { type: "linkedOrders", orders: Orders };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;

export type UserType = User & {
    id: string,
};
