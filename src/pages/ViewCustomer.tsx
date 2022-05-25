import { FC, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    DeskproAppTheme,
    useDeskproAppTheme,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { Tag, Toggle } from "@deskpro/deskpro-ui";
import { useStore } from "../context/StoreProvider/hooks";
import { TextBlockWithLabel } from "../components/common";

const tagNames = {
    vip: "VIP",
    development: "Development",
};

const getTagColorSchema = (theme: DeskproAppTheme['theme']) => ({
    vip: {
        borderColor: theme.colors.orange100,
        backgroundColor: theme.colors.orange10,
    },
    development: {
        borderColor: theme.colors.turquoise100,
        backgroundColor: theme.colors.turquoise10,
    },
});

type TagNames = typeof tagNames;

const customerTags: Array<keyof TagNames> = ["vip", "development"];

export const ViewCustomer: FC = () => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();
    const { theme } = useDeskproAppTheme();
    const tagColorSchema = getTagColorSchema(theme);

    useEffect(() => {
        client?.setTitle("Armen Tamzarian");
        client?.deregisterElement("shopifyMenu");
        client?.registerElement("shopifyEditButton", {
            type: "edit_button",
            payload: { type: "changePage", page: "edit_customer" },
        });
    }, [client, state]);

    return (
        <>
            <TextBlockWithLabel
                label="Email"
                text="armen.tamzarian@company.com"
            />
            <TextBlockWithLabel
                label="Phone number"
                text="-"
            />
            <TextBlockWithLabel
                label="Tags"
                text={(
                    <Stack gap={6}>
                        {customerTags.map((tag) => (
                            <Tag
                                key={tag}
                                color={{
                                    ...tagColorSchema[tag],
                                    textColor: theme.colors.grey100,
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
                        disabled
                        label="Yes"
                        checked={true}
                    />
                )}
            />
            <TextBlockWithLabel
                label="Customer Note"
                text="The user said that he was really satisfied with our support agent. John offered a discount if the user is going to upgrade to let agents to use Deskpro."
            />
        </>
    );
};
