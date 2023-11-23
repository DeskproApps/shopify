import { useFormik } from "formik";
import isEmpty from "lodash/isEmpty";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
} from "@deskpro/app-sdk";
import {
    Label,
    Container,
    ErrorBlock,
} from "../common";
import { getTagColorSchema } from "../../utils";
import { validationSchema, getInitValues } from "./utils";
import type { FC } from "react";
import type { FormState, FormProps } from "./types";

const EditCustomerForm: FC<FormProps> = ({
    customer,
    error,
    onSubmit,
    onCancel,
}) => {
    const { tags } = customer;
    const { theme } = useDeskproAppTheme();
    const {
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        handleChange,
        getFieldProps,
    } = useFormik<FormState>({
        initialValues: getInitValues(customer),
        validationSchema,
        onSubmit,
    });

    const isValid = (fieldName: keyof FormState): boolean => {
        return !(touched[fieldName] && errors[fieldName]);
    };

    return (
        <Container>
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
                        onClick={onCancel}
                        style={{ minWidth: "70px", justifyContent: "center" }}
                    />
                </Stack>
            </form>
        </Container>
    )
};

export { EditCustomerForm };
