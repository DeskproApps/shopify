import { FC, useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    Button,
    lightTheme,
    useDeskproAppClient,
    TextAreaWithDisplay,
} from "@deskpro/app-sdk";
import {InputWithDisplay, Tag, Toggle} from "@deskpro/deskpro-ui";
import { useStore } from "../context/StoreProvider/hooks";
import { Label, TextBlockWithLabel } from "../components/common";

const tagNames = {
    vip: "VIP",
    development: "Development",
};

const tagColorSchema = {
    vip: {
        borderColor: lightTheme.colors.orange100,
        backgroundColor: lightTheme.colors.orange10,
    },
    development: {
        borderColor: lightTheme.colors.turquoise100,
        backgroundColor: lightTheme.colors.turquoise10,
    },
};

type TagNames = typeof tagNames;

const customerTags: Array<keyof TagNames> = ["vip", "development"];

export const EditCustomer: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [firstName, setFirstName] = useState<string>("Armen");
    const [lastName, setLastName] = useState<string>("Tamzarian");
    const [email, setEmail] = useState<string>("armen@me.com");
    const [phone, setPhone] = useState<string>("")
    const [isSendEmail, setIsSendEmail] = useState<boolean>(true);
    const [note, setNote] = useState<string>("The user said that he was really satisfied with our support agent. John offered a discount if the user is going to upgrade to let agents to use Deskpro.");

    useEffect(() => {
        client?.setTitle("Edit Customer Details");
        client?.deregisterElement("shopifyMenu");
        client?.deregisterElement("shopifyEditButton");
        client?.registerElement("shopifyButton", { type: "refresh_button" });
    }, [client, state]);

    return (
        <>
            <Label htmlFor="firstName" label="First name" required>
                <InputWithDisplay
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="lastName" label="Last name" required>
                <InputWithDisplay
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="email" label="Email" required>
                <InputWithDisplay
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    inputsize="small"
                />
            </Label>
            <Label htmlFor="phone" label="Phone number">
                <InputWithDisplay
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter number"
                    inputsize="small"
                />
            </Label>
            <TextBlockWithLabel
                label="Tags"
                text={(
                    <Stack gap={6}>
                        {customerTags.map((tag) => (
                            <Tag
                                key={tag}
                                color={{
                                    ...tagColorSchema[tag],
                                    textColor: "#4C4F50",
                                }}
                                label={tagNames[tag]}
                                closeIcon={faTimes}
                            />
                        ))}
                    </Stack>
                )}
            />
            <TextBlockWithLabel
                label="Receive Marketing Email"
                text={(
                    <Toggle
                        label={isSendEmail ? "Yes" : "No"}
                        checked={isSendEmail}
                        onChange={() => setIsSendEmail(!isSendEmail)}
                    />
                )}
            />
            <Label htmlFor="note" label="Customer Note">
                <TextAreaWithDisplay
                    value={note}
                    placeholder="Enter note"
                    onChange={(e) => setNote(e.target.value)}
                />
            </Label>

            <Stack justify="space-between">
                <Button
                    disabled
                    text="Save"
                    onClick={() => dispatch({ type: "changePage", page: "view_customer" })}
                    style={{ minWidth: "70px", justifyContent: "center" }}
                />
                <Button
                    text="Cancel"
                    intent="tertiary"
                    onClick={() => dispatch({ type: "changePage", page: "view_customer" })}
                    style={{ minWidth: "70px", justifyContent: "center" }}
                />
            </Stack>
        </>
    );
};
