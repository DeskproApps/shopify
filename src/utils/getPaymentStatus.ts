import { match } from "ts-pattern";
import { DeskproAppTheme } from "@deskpro/app-sdk";
import { FinancialStatus } from "../services/shopify/types";

const getPaymentStatusColorSchema = (
    theme: DeskproAppTheme['theme'],
    status: FinancialStatus,
) => {
    return match(status)
        .with("AUTHORIZED", () => theme.colors.burgundy100)
        .with("EXPIRED", () => theme.colors.orange100)
        .with("PAID", () => theme.colors.turquoise100)
        .with("PARTIALLY_PAID", () => theme.colors.turquoise100)
        .with("PENDING", () => theme.colors.cyan100)
        .with("PARTIALLY_REFUNDED", () => theme.colors.brandShade80)
        .with("REFUNDED", () => theme.colors.brandShade80)
        .with("VOIDED", () => theme.colors.grey40)
        .otherwise(() => theme.colors.grey40)
};

const getPaymentStatusName = (status: FinancialStatus) => {
    return match(status)
        .with("AUTHORIZED", () => "Authorized")
        .with("EXPIRED", () => "Overdue")
        .with("PAID", () => "Paid")
        .with("PARTIALLY_PAID", () => "Partially paid")
        .with("PENDING", () => "Payment pending")
        .with("PARTIALLY_REFUNDED", () => "Partially refunded")
        .with("REFUNDED", () => "Refunded")
        .with("VOIDED", () => "Voided")
        .otherwise(() => status);
};

export { getPaymentStatusColorSchema, getPaymentStatusName };
