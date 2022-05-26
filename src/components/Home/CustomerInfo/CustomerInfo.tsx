import { FC } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { SubHeader, TextBlockWithLabel } from "../../common";
import { getFullName } from "../../../utils";
import { Props } from "./types";

const CustomerInfo: FC<Props> = ({
    link,
    email,
    onChangePage,
    first_name: firstName,
    last_name: lastName,
}) => {
    return (
        <>
            <SubHeader
                text={getFullName({ firstName, lastName })}
                link={link}
                onChangePage={onChangePage}
            />
            <TextBlockWithLabel
                label="Email"
                text={email}
            />
            <TextBlockWithLabel
                label="Total spent"
                text="1485.00 USD"
            />
            <TextBlockWithLabel
                label="Customer Note"
                text="The user said that he was really satisfied with our support agent. John offered a discount if the user is going to upgrade to let agents to use Deskpro."
            />
            <HorizontalDivider style={{ marginBottom: 10 }}/>
        </>
    );
};

export { CustomerInfo };
