import { useCallback } from "react";
import { Link, Title, HorizontalDivider } from "@deskpro/app-sdk";
import { TextBlockWithLabel, ShopifyLogo } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Props } from "./types";

const CustomerInfo: FC<Props> = ({
    link,
    note,
    email,
    amountSpent,
    displayName,
    onChangePage,
}) => {
    const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
      e.preventDefault();
      onChangePage && onChangePage();
    }, [onChangePage]);
    return (
        <>
            <Title
                title={(
                    <Link href="#" onClick={onClick}>{displayName}</Link>
                )}
                link={link}
                icon={<ShopifyLogo/>}
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
