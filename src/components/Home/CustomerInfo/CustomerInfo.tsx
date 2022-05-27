import { FC } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { SubHeader, TextBlockWithLabel } from "../../common";
import { getFullName } from "../../../utils";
import { Props } from "./types";

const CustomerInfo: FC<Props> = ({
    link,
    note,
    email,
    currency,
    total_spent,
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
                text={`${total_spent} ${currency}`}
            />
            <TextBlockWithLabel
                label="Customer Note"
                text={note ? note : '-'}
            />
            <HorizontalDivider style={{ marginBottom: 10 }}/>
        </>
    );
};

export { CustomerInfo };
