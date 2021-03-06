import { FC } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { SubHeader, TextBlockWithLabel } from "../../common";
import { Props } from "./types";

const CustomerInfo: FC<Props> = ({
    link,
    note,
    email,
    amountSpent,
    displayName,
    onChangePage,
}) => {
    return (
        <>
            <SubHeader
                text={displayName}
                link={link}
                onChangePage={onChangePage}
            />
            <TextBlockWithLabel
                label="Email"
                text={email}
            />
            <TextBlockWithLabel
                label="Total spent"
                text={`${amountSpent.amount} ${amountSpent.currencyCode}`}
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
