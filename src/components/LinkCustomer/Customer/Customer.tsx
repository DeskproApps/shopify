import { FC } from "react";
import {
    P1,
    Label,
    Stack,
    Checkbox,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { Props } from "./types";

const Customer: FC<Props> = ({
    id,
    email,
    checked,
    onChange,
    displayName,
}) => {
    const { theme } = useDeskproAppTheme();

    return (
        <Stack align="center" justify="start" style={{ marginBottom: 5 }}>
            <Label htmlFor={`customer-${id}`}>
                <Checkbox
                    value={id}
                    checked={checked}
                    onChange={onChange}
                    id={`customer-${id}`}
                    label={(
                        <>
                            <P1>{displayName}</P1>
                            {email && (
                                <P1 style={{ color: theme.colors.grey80 }}>
                                    &lt;{email}&gt;
                                </P1>
                            )}
                        </>
                    )}
                />
            </Label>
        </Stack>
    );
}

export { Customer };
