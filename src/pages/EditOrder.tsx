import { FC, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { P5, H3, InputWithDisplay } from "@deskpro/deskpro-ui";
import {
    Pill,
    Stack,
    Button,
    HorizontalDivider,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { Label, TextBlockWithLabel } from "../components/common";

const Note = styled(P5)`
    color: ${({ theme }) => theme.colors.grey40};
`;

export const EditOrder: FC = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();

    const [shipping, setShipping] = useState({
        firstName: "Armen",
        lastName: "Tamzarian",
        firstLine: "1 Market St",
        secondLine: "-",
        city: "San Francisco",
        zip: "94105",
    });

    const [billing, setBilling] = useState({
        firstName: "Armen",
        lastName: "Tamzarian",
        firstLine: "1 Market St",
        secondLine: "-",
        city: "San Francisco",
        zip: "94105",
    });

    const onChangeShipping = (name: string) => (e: ChangeEvent<HTMLInputElement>) => setShipping((state) => ({
        ...state,
        [name]: e.target.value,
    }));

    const onChangeBilling = (name: string) => (e: ChangeEvent<HTMLInputElement>) => setBilling((state) => ({
        ...state,
        [name]: e.target.value,
    }));

    useEffect(() => {
        client?.setTitle("Edit Order #4357");
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.deregisterElement("shopifyButton");
    }, [client, state]);

    return (
        <>
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
            <TextBlockWithLabel
                label="Order notes"
                text={(<Note>None</Note>)}
            />
            <HorizontalDivider style={{ marginBottom: "10px" }} />
            <H3 style={{ marginBottom: "8px" }}>Shipping Address</H3>
            <Label htmlFor="shippingFirstName" label="First name">
                <InputWithDisplay
                    type="text"
                    id="firstName"
                    value={shipping.firstName}
                    onChange={onChangeShipping('firstName')}
                    placeholder="Enter first name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="shippingLastName" label="Last name">
                <InputWithDisplay
                    type="text"
                    id="shippingLastName"
                    value={shipping.lastName}
                    onChange={onChangeShipping('lastName')}
                    placeholder="Enter last name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="shippingFirstLine" label="First Line">
                <InputWithDisplay
                    type="text"
                    id="shippingFirstLine"
                    value={shipping.firstLine}
                    onChange={onChangeShipping('firstLine')}
                    placeholder="Enter first line"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="shippingSecondLine" label="Second Line">
                <InputWithDisplay
                    type="text"
                    id="shippingSecondLine"
                    value={shipping.secondLine}
                    onChange={onChangeShipping('secondLine')}
                    placeholder="Enter second line"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="shippingCity" label="City">
                <InputWithDisplay
                    type="text"
                    id="shippingCity"
                    value={shipping.city}
                    onChange={onChangeShipping('city')}
                    placeholder="Enter city"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="shippingZip" label="Zip/Post code">
                <InputWithDisplay
                    type="text"
                    id="shippingZip"
                    value={shipping.zip}
                    onChange={onChangeShipping('zip')}
                    placeholder="Enter zip"
                    inputsize="small"
                />
            </Label>

            <HorizontalDivider style={{ marginBottom: "10px" }} />
            <H3 style={{ marginBottom: "8px" }}>Billing Address</H3>
            <Label htmlFor="billingFirstName" label="First name">
                <InputWithDisplay
                    type="text"
                    id="firstName"
                    value={billing.firstName}
                    onChange={onChangeBilling('firstName')}
                    placeholder="Enter first name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="billingLastName" label="Last name">
                <InputWithDisplay
                    type="text"
                    id="billingLastName"
                    value={billing.lastName}
                    onChange={onChangeBilling('lastName')}
                    placeholder="Enter last name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="billingFirstLine" label="First Line">
                <InputWithDisplay
                    type="text"
                    id="billingFirstLine"
                    value={billing.firstLine}
                    onChange={onChangeBilling('firstLine')}
                    placeholder="Enter first line"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="billingSecondLine" label="Second Line">
                <InputWithDisplay
                    type="text"
                    id="billingSecondLine"
                    value={billing.secondLine}
                    onChange={onChangeBilling('secondLine')}
                    placeholder="Enter second line"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="billingCity" label="City">
                <InputWithDisplay
                    type="text"
                    id="billingCity"
                    value={billing.city}
                    onChange={onChangeBilling('city')}
                    placeholder="Enter city"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="billingZip" label="Zip/Post code">
                <InputWithDisplay
                    type="text"
                    id="billingZip"
                    value={billing.zip}
                    onChange={onChangeBilling('zip')}
                    placeholder="Enter zip"
                    inputsize="small"
                />
            </Label>

            <Stack justify="space-between">
                <Button
                    disabled
                    text="Save"
                    onClick={() => dispatch({ type: "changePage", page: "view_order" })}
                    style={{ minWidth: "70px", justifyContent: "center" }}
                />
                <Button
                    text="Cancel"
                    intent="tertiary"
                    onClick={() => dispatch({ type: "changePage", page: "view_order" })}
                    style={{ minWidth: "70px", justifyContent: "center" }}
                />
            </Stack>
        </>
    );
};
