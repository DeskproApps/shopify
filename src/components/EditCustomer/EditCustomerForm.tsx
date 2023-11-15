import { FC, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
    Stack,
    Button,
    AnyIcon,
    InputWithDisplay,
    Tag,
    Toggle,
    TextAreaWithDisplay,
} from "@deskpro/deskpro-ui";
import {
    Property,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../../context/StoreProvider/hooks";
import {
    Label,
    ErrorBlock,
} from "../common";
import {
    getApiErrors,
    parseDateTime,
    getTagColorSchema,
} from "../../utils";
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
    const navigate = useNavigate();
    const {
        id,
        tags,
        emailMarketingConsent: {marketingOptInLevel },
    } = props;
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
    const [, dispatch] = useStore();
    const [error, setError] = useState<string | string[]>([]);
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

            setError([]);

            const newValues: CustomerUpdateValues = {
                ...values,
                emailMarketingConsent: {
                    marketingState: isReceiveMarketingEmail ? "SUBSCRIBED" : "UNSUBSCRIBED",
                    marketingOptInLevel,
                    consentUpdatedAt: parseDateTime(),
                },
            };

            await setCustomer(client, id, newValues)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                .then(([
                    { customerUpdate: { userErrors: customerErrors } },
                    { customerEmailMarketingConsentUpdate: { emailErrors } }
                ]) => {
                    if (isEmpty(customerErrors) && isEmpty(emailErrors)) {
                        navigate({
                          pathname: `/view_customer`,
                          search: `?customerId=${id}`,
                        });
                    } else {
                        const errors = [
                            ...getApiErrors(customerErrors),
                            ...getApiErrors(emailErrors),
                        ]
                        setError(errors);
                    }
                })
                .catch((error) => dispatch({ type: "error", error: get(error, ["errors"], error) }));
        },
    });

    const isValid = (fieldName: keyof FormState): boolean => {
        return !(touched[fieldName] && errors[fieldName]);
    };

    return (
        <>
            {!isEmpty(error) && <ErrorBlock text={error}/>}
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
                <Property
                    label="Tags"
                    text={(
                        <Stack gap={6} wrap="wrap">
                            {tags.map((tag) => (
                                <Tag
                                    key={tag}
                                    label={tag}
                                    closeIcon={faTimes as AnyIcon}
                                    color={{
                                        ...getTagColorSchema(theme, tag),
                                        textColor: "#4C4F50",
                                    }}
                                />
                            ))}
                        </Stack>
                    )}
                />
                <Property
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
                        onClick={() => navigate({ pathname: `/view_customer`, search: `?customerId=${id}` })}
                        style={{ minWidth: "70px", justifyContent: "center" }}
                    />
                </Stack>
            </form>
        </>
    )
};

export { EditCustomerForm };
