import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
    H3,
    Pill,
    Stack,
    Button,
    HorizontalDivider,
    useDeskproAppTheme,
    TextAreaWithDisplay,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { InputWithDisplay } from "@deskpro/deskpro-ui";
import { useStore } from "../../context/StoreProvider/hooks";
import {
    getApiErrors,
    financialStatuses,
    fulfillmentStatuses,
} from "../../utils";
import { setOrder } from "../../services/shopify";
import { Order } from "../../services/shopify/types";
import { Label, TextBlockWithLabel, ErrorBlock } from "../common";
import { FormState } from "./type";

const validationSchema = yup.object().shape({
    financialStatus: yup.string().required().oneOf(financialStatuses),
    fulfillmentStatus: yup.string().required().oneOf(fulfillmentStatuses),
});

const EditOrderForm: FC<Order> = ({
    id,
    note,
    billingAddress,
    shippingAddress,
    displayFinancialStatus,
    displayFulfillmentStatus,
}) => {
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
    const [, dispatch] = useStore();
    const [error, setError] = useState<string | string[]>([]);
    const { values, handleSubmit, isSubmitting, getFieldProps } = useFormik<FormState>({
        validationSchema,
        initialValues: {
            note,
            financialStatus: displayFinancialStatus,
            fulfillmentStatus: displayFulfillmentStatus,
            shippingAddress1: shippingAddress.address1 || "",
            shippingAddress2: shippingAddress.address2 || "",
            shippingCity: shippingAddress.city || "",
            shippingZip: shippingAddress.zip || "",
            shippingFirstName: shippingAddress.firstName || "",
            shippingLastName: shippingAddress.lastName || "",
            billingAddress1: billingAddress.address1 || "",
            billingAddress2: billingAddress.address2 || "",
            billingCity: billingAddress.city || "",
            billingZip: billingAddress.zip || "",
            billingFirstName: billingAddress.firstName || "",
            billingLastName: billingAddress.lastName || "",
        },
        onSubmit: async (values) => {
            if (!client) {
                return;
            }

            setError([]);

            await setOrder(client, id, {
                note: values.note,
                shippingAddress: {
                    firstName: values.shippingFirstName,
                    lastName: values.shippingLastName,
                    address1: values.shippingAddress1,
                    address2: values.shippingAddress2,
                    city: values.shippingCity,
                    countryCode: shippingAddress.countryCodeV2,
                    zip: values.shippingZip,
                }
            })
                .then(({ orderUpdate: { userErrors } }) => {
                    if (isEmpty(userErrors)) {
                        dispatch({
                            type: "changePage",
                            page: "view_order",
                            params: { orderId: id },
                        });
                    } else {
                        setError(getApiErrors(userErrors));
                    }
                })
                .catch((error) => dispatch({ type: "error", error: get(error, ["errors"], error) }));
        }
    });

    return (
        <>
            {!isEmpty(error) && <ErrorBlock text={error}/>}
            <form onSubmit={handleSubmit}>
                <TextBlockWithLabel
                    label="Payment status"
                    text={(
                        <Pill
                            label="Paid"
                            textColor={theme.colors.white}
                            backgroundColor={theme.colors.turquoise100}
                        />
                    )}
                />
                <TextBlockWithLabel
                    label="Fulfillment status"
                    text={(
                        <Pill
                            label="Unfulfilled"
                            textColor={theme.colors.white}
                            backgroundColor={theme.colors.systemShade80}
                        />
                    )}
                />
                <Label htmlFor="note" label="Order notes">
                    <TextAreaWithDisplay
                        placeholder="Enter note"
                        {...getFieldProps("note")}
                    />
                </Label>

                <HorizontalDivider style={{ marginBottom: "10px" }} />
                <H3 style={{ marginBottom: "8px" }}>Shipping Address</H3>
                <Label htmlFor="shippingFirstName" label="First name">
                    <InputWithDisplay
                        type="text"
                        id="firstName"
                        {...getFieldProps("shippingFirstName")}
                        placeholder="Enter first name"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="shippingLastName" label="Last name">
                    <InputWithDisplay
                        type="text"
                        id="shippingLastName"
                        {...getFieldProps("shippingLastName")}
                        placeholder="Enter last name"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="shippingFirstLine" label="First Line">
                    <InputWithDisplay
                        type="text"
                        id="shippingFirstLine"
                        {...getFieldProps("shippingAddress1")}
                        placeholder="Enter first line"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="shippingSecondLine" label="Second Line">
                    <InputWithDisplay
                        type="text"
                        id="shippingSecondLine"
                        {...getFieldProps("shippingAddress2")}
                        placeholder="Enter second line"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="shippingCity" label="City">
                    <InputWithDisplay
                        type="text"
                        id="shippingCity"
                        {...getFieldProps("shippingCity")}
                        placeholder="Enter city"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="shippingZip" label="Zip/Post code">
                    <InputWithDisplay
                        type="text"
                        id="shippingZip"
                        {...getFieldProps("shippingZip")}
                        placeholder="Enter zip"
                        inputsize="small"
                    />
                </Label>

                <HorizontalDivider style={{ marginBottom: "10px" }} />

                <H3 style={{ marginBottom: "8px" }}>Billing Address</H3>
                <Label htmlFor="billingFirstName" label="First name">
                    <InputWithDisplay
                        disabled
                        type="text"
                        id="firstName"
                        {...getFieldProps("billingFirstName")}
                        placeholder="Enter first name"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="billingLastName" label="Last name">
                    <InputWithDisplay
                        disabled
                        type="text"
                        id="billingLastName"
                        {...getFieldProps("billingLastName")}
                        placeholder="Enter last name"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="billingFirstLine" label="First Line">
                    <InputWithDisplay
                        disabled
                        type="text"
                        id="billingFirstLine"
                        {...getFieldProps("billingAddress1")}
                        placeholder="Enter first line"
                        inputsize="small"
                    />
                </Label>

                {values.billingAddress2 && (
                    <Label htmlFor="billingSecondLine" label="Second Line">
                        <InputWithDisplay
                            disabled
                            type="text"
                            id="billingSecondLine"
                            {...getFieldProps("billingAddress2")}
                            placeholder="Enter second line"
                            inputsize="small"
                        />
                    </Label>
                )}
                <Label htmlFor="billingCity" label="City">
                    <InputWithDisplay
                        disabled
                        type="text"
                        id="billingCity"
                        {...getFieldProps("billingCity")}
                        placeholder="Enter city"
                        inputsize="small"
                    />
                </Label>
                <Label htmlFor="billingZip" label="Zip/Post code">
                    <InputWithDisplay
                        disabled
                        type="text"
                        id="billingZip"
                        {...getFieldProps("billingZip")}
                        placeholder="Enter zip"
                        inputsize="small"
                    />
                </Label>

                <Stack justify="space-between">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        text="Save"
                        style={{ minWidth: "70px", justifyContent: "center" }}
                    />
                    <Button
                        text="Cancel"
                        intent="tertiary"
                        onClick={() => dispatch({ type: "changePage", page: "view_order", params: { orderId: id } })}
                        style={{ minWidth: "70px", justifyContent: "center" }}
                    />
                </Stack>
            </form>
        </>
    );
};

export { EditOrderForm };
