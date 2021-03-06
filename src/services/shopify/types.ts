export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CustomerSearchParams = {
    querySearch?: string,
    email?: string,
};

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type Money = {
    amount: number,
    currencyCode: string,
}

export type FinancialStatus =
    | "AUTHORIZED"
    | "EXPIRED"
    | "PAID"
    | "PARTIALLY_PAID"
    | "PENDING"
    | "PARTIALLY_REFUNDED"
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

export type EmailMarketingConsent = {
    consentUpdatedAt: DateTime,
    marketingOptInLevel: "SINGLE_OPT_IN" | "CONFIRMED_OPT_IN" | "UNKNOWN",
    marketingState:
        | "NOT_SUBSCRIBED"
        | "PENDING"
        | "SUBSCRIBED"
        | "UNSUBSCRIBED"
        | "REDACTED"
        | "INVALID",
}

export type Address = {
    address1: string,
    address2: string,
    city: string,
    countryCodeV2: string,
    zip: string,
    firstName: string,
    lastName: string,
}

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
    tags: string[],
    orders: Orders
    comments: Comments,
    emailMarketingConsent: EmailMarketingConsent,
};

export type OrderItemType = {
    id: string,
    quantity: number,
    title: string,
    sku: string,
    image: { url: string }
    product: {
        id: string,
        title: string,
        description: string,
    },
    originalUnitPriceSet: {
        presentmentMoney: Money,
    }
};

export type Order = {
    id: string,
    note: string,
    legacyResourceId: string,
    createdAt: DateTime,
    displayFinancialStatus: FinancialStatus,
    displayFulfillmentStatus: FulfillmentStatus,
    lineItems: Array<OrderItemType>,
    shippingAddress: Address,
    billingAddress: Address,
    subtotalPriceSet: {
        presentmentMoney: Money,
    }
    totalShippingPriceSet: {
        presentmentMoney: Money,
    }
    totalTaxSet: {
        presentmentMoney: Money,
    }
    totalPriceSet: {
        presentmentMoney: Money,
    }
};

export type Orders = Array<Order>;

export type CommentEvent = {
    id: string,
    message: string,
    createdAt: DateTime,
};

export type Comments = Array<CommentEvent>;
