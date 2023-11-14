import { FC } from "react";
import omit from "lodash/omit";
import { H1, P5, Pill } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import { Order } from "../../../services/shopify/types";
import {TextBlockWithLabel} from "../../common";
import {
    getTime,
    getDate,
    getPaymentStatusColorSchema,
    getPaymentStatusName,
    getShippingStatusColorSchema,
    getShippingStatusName,
} from "../../../utils";

const Information: FC<Order> = ({
    note,
    createdAt,
    billingAddress,
    shippingAddress,
    displayFinancialStatus,
    displayFulfillmentStatus,
}) => {
    const { theme } = useDeskproAppTheme();

    return (
        <>
            <H1 style={{ marginBottom: 10 }}>Information</H1>
            <TextBlockWithLabel
                label="Payment status"
                text={(
                    <Pill
                        textColor={theme.colors.white}
                        label={getPaymentStatusName(displayFinancialStatus)}
                        backgroundColor={getPaymentStatusColorSchema(theme, displayFinancialStatus)}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Fulfillment status"
                text={(
                    <Pill
                        textColor={theme.colors.white}
                        label={getShippingStatusName(displayFulfillmentStatus)}
                        backgroundColor={getShippingStatusColorSchema(theme, displayFulfillmentStatus)}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Order notes"
                text={note || (<P5 style={{ color: theme.colors.grey40 }}>None</P5>)}
            />
            <TextBlockWithLabel
                label="Shipping Address"
                text={Object.values(omit(shippingAddress, ["firstName", "lastName"])).join(", ")}
            />
            <TextBlockWithLabel
                label="Billing Address"
                text={Object.values(omit(billingAddress, ["firstName", "lastName"])).join(", ")}
            />
            <TextBlockWithLabel
                label="Created"
                text={`${getDate(createdAt)} | ${getTime(createdAt)}` }
            />
        </>
    );
}

export { Information };
