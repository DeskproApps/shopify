export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CustomerSearchParams = {
    querySearch?: string,
    email?: string,
};

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

type Money = {
    amount: number,
    currencyCode: string,
}

export type FinancialStatus =
    | "AUTHORIZED"
    | "EXPIRED"
    | "PAID"
    | "PARTIALLY_PAID"
    | "PARTIALLY_REFUNDED"
    | "PENDING"
    | "REFUNDED"
    | "VOIDED";

export type FulfillmentStatus =
    | "UNFULFILLED"
    | "PARTIALLY_FULFILLED"
    | "FULFILLED"
    | "RESTOCKED"
    | "PENDING_FULFILLMENT"
    | "OPEN"
    | "IN_PROGRESS"
    | "ON_HOLD"
    | "SCHEDULED";

export type CustomerType = {
    id: string,
    legacyResourceId: string,
    createdAt: DateTime,
    displayName: string,
    email: string,
    hasTimelineComment: boolean,
    locale: string,
    note: string,
    phone: string,
    firstName: string,
    lastName: string,
    amountSpent: Money,
    numberOfOrders: string,
    orders: Orders
    comments: Comments,
};

export type OrderItem = {
    id: string,
    title: string,
};

export type Order = {
    id: string,
    legacyResourceId: string,
    createdAt: DateTime,
    displayFinancialStatus: FinancialStatus,
    displayFulfillmentStatus: FulfillmentStatus,
    lineItems: Array<OrderItem>,
};

export type Orders = Array<Order>;

export type CommentEvent = {
    id: string,
    message: string,
    createdAt: DateTime,
};

export type Comments = Array<CommentEvent>;
