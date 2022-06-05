import { match } from "ts-pattern";
import { DeskproAppTheme } from "@deskpro/app-sdk";
import { FulfillmentStatus } from "../services/shopify/types";

const fulfillmentStatuses = [
    "ON_HOLD",
    "PARTIALLY_FULFILLED",
    "FULFILLED",
    "SCHEDULED",
    "UNFULFILLED",
];

const getShippingStatusColorSchema = (
    theme: DeskproAppTheme['theme'],
    status: FulfillmentStatus,
) => {
    return match(status)
        .with("ON_HOLD", () => theme.colors.jasper80)
        .with("PARTIALLY_FULFILLED", () => theme.colors.turquoise100)
        .with("FULFILLED", () => theme.colors.turquoise100)
        .with("SCHEDULED", () => theme.colors.cyan10)
        .with("UNFULFILLED", () => theme.colors.red100)
        .otherwise(() => theme.colors.grey40)
};

const getShippingStatusName = (status: FulfillmentStatus) => {
    return match(status)
        .with("ON_HOLD", () => 'On hold')
        .with("PARTIALLY_FULFILLED", () => 'Partially fulfilled')
        .with("FULFILLED", () => 'Fulfilled')
        .with("SCHEDULED", () => 'Scheduled')
        .with("UNFULFILLED", () => 'Unfulfilled')
        .otherwise(() => status);
};

export { getShippingStatusName, getShippingStatusColorSchema, fulfillmentStatuses };
