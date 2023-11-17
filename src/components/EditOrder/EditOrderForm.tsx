import { useFormik } from "formik";
import isEmpty from "lodash/isEmpty";
import {
    H3,
    Pill,
    Stack,
    Button,
    InputWithDisplay,
    TextAreaWithDisplay,
} from "@deskpro/deskpro-ui";
import {
    Property,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { validationSchema, getInitValues } from "./utils";
import { Label, ErrorBlock, Container } from "../common";
import type { FC } from "react";
import type { FormState, FormProps } from "./type";

const EditOrderForm: FC<FormProps> = ({ order, onCancel, onSubmit, error }) => {
    const { theme } = useDeskproAppTheme();
    const { values, handleSubmit, isSubmitting, getFieldProps } = useFormik<FormState>({
        validationSchema,
        initialValues: getInitValues(order),
        onSubmit
    });

    return (
        <Container>
            {!isEmpty(error) && <ErrorBlock text={error}/>}
            <form onSubmit={handleSubmit}>
                <Property
                    label="Payment status"
                    text={(
                        <Pill
                            label="Paid"
                            textColor={theme.colors.white}
                            backgroundColor={theme.colors.turquoise100}
                        />
                    )}
                />
                <Property
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
                        onClick={onCancel}
                        style={{ minWidth: "70px", justifyContent: "center" }}
                    />
                </Stack>
            </form>
        </Container>
    );
};

export { EditOrderForm };
