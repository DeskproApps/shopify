import { FC } from "react";
import { Radio, Stack, Label, P1 } from "@deskpro/app-sdk";
import { lightTheme } from "@deskpro/deskpro-ui";
import { getFullName } from "../../utils";
import { Props } from "./types";

const Customer: FC<Props> = ({
        id,
        email,
        checked,
        onChange,
        last_name: lastName,
        first_name: firstName,
    }) => (
    <Stack align="center" justify="start" style={{ margin: "5px 0" }}>
        <Radio
            value={id}
            checked={checked}
            onChange={onChange}
            id={`customer-${id}`}
            style={{ margin: "0 8px" }}
        />
        <Label htmlFor={`customer-${id}`}>
            <P1>{getFullName({ firstName, lastName })}</P1>
            {email && (
                <P1 style={{ color: lightTheme.colors.grey80 }}>
                    &lt;{email}&gt;
                </P1>
            )}
        </Label>
    </Stack>
);

export { Customer };
