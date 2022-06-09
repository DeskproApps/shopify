import { FC } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    Button,
    useDeskproAppTheme,
    useDeskproAppClient,
    TextAreaWithDisplay,
} from "@deskpro/app-sdk";
import { InputWithDisplay, Tag, Toggle } from "@deskpro/deskpro-ui";
import { useStore } from "../../context/StoreProvider/hooks";
import { Label, TextBlockWithLabel } from "../common";
import { getTagColorSchema, parseDateTime } from "../../utils";
import { setCustomer } from "../../services/shopify";
import { CustomerType } from "../../services/shopify/types";
import { FormState } from "./types";
import { CustomerUpdateValues } from "../../services/shopify/setCustomer";

const validationSchema = yup.object().shape({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().required().email(),
});

const getInitValues = ({
    note,
    email,
    phone,
    lastName,
    firstName,
    emailMarketingConsent: { marketingState },
}: CustomerType): FormState => ({
    firstName,
    lastName,
    email,
    phone,
    note,
    isReceiveMarketingEmail: marketingState === "SUBSCRIBED",
});

const EditCustomerForm: FC<CustomerType> = (props) => {
    const {
        id,
        tags,
        emailMarketingConsent: {marketingOptInLevel },
    } = props;
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
    const [, dispatch] = useStore();
    const {
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        handleChange,
        getFieldProps,
    } = useFormik<FormState>({
        initialValues: getInitValues(props),
        validationSchema,
        onSubmit: async ({ isReceiveMarketingEmail, ...values }) => {
            if (!client) {
                return;
            }

            const newValues: CustomerUpdateValues = {
                ...values,
                emailMarketingConsent: {
                    marketingState: isReceiveMarketingEmail ? "SUBSCRIBED" : "UNSUBSCRIBED",
                    marketingOptInLevel,
                    consentUpdatedAt: parseDateTime(),
                },
            };

            await setCustomer(client, id, newValues)
                .then(() => dispatch({
                    type: "changePage",
                    page: "view_customer",
                    params: { customerId: id },
                }))
                .catch((error) => dispatch({ type: "error", error }));
        },
    });

    const isValid = (fieldName: keyof FormState): boolean => {
        return !(touched[fieldName] && errors[fieldName]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="firstName" label="First name" required>
                <InputWithDisplay
                    type="text"
                    id="firstName"
                    {...getFieldProps("firstName")}
                    error={!isValid("firstName")}
                    placeholder="Enter first name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="lastName" label="Last name" required>
                <InputWithDisplay
                    type="text"
                    id="lastName"
                    {...getFieldProps("lastName")}
                    error={!isValid("lastName")}
                    placeholder="Enter last name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="email" label="Email" required>
                <InputWithDisplay
                    type="text"
                    id="email"
                    error={!isValid("email")}
                    {...getFieldProps("email")}
                    placeholder="Enter email"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="phone" label="Phone number">
                <InputWithDisplay
                    type="text"
                    id="phone"
                    {...getFieldProps("phone")}
                    placeholder="Enter number"
                    inputsize="small"
                />
            </Label>
            <TextBlockWithLabel
                label="Tags"
                text={(
                    <Stack gap={6} wrap="wrap">
                        {tags.map((tag) => (
                            <Tag
                                key={tag}
                                label={tag}
                                closeIcon={faTimes}
                                color={{
                                    ...getTagColorSchema(theme, tag),
                                    textColor: "#4C4F50",
                                }}
                            />
                        ))}
                    </Stack>
                )}
            />
            <TextBlockWithLabel
                label="Receive Marketing Email"
                text={(
                    <Toggle
                        name="isReceiveMarketingEmail"
                        label={values.isReceiveMarketingEmail ? "Yes" : "No"}
                        checked={values.isReceiveMarketingEmail}
                        onChange={handleChange}
                    />
                )}
            />
            <Label htmlFor="note" label="Customer Note">
                <TextAreaWithDisplay
                    placeholder="Enter note"
                    {...getFieldProps("note")}
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
                    onClick={() => dispatch({
                        type: "changePage",
                        page: "view_customer",
                        params: { customerId: id }
                    })}
                    style={{ minWidth: "70px", justifyContent: "center" }}
                />
            </Stack>
        </form>
    )
};

export { EditCustomerForm };
