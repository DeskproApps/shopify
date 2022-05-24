import { FC } from "react";
import {
    H0,
    P5,
    P11,
    Stack,
    VerticalDivider,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { TextBlockWithLabel } from "../../common";
import img from "./item.png";
import { OrderItemType } from "./types";

const Image: FC<Partial<OrderItemType> & { basis?: number }> = ({ basis, name }) => (
    <Stack basis={`${basis}%`}>
        <img src={img} alt={name} style={{ width: "100%", height: "auto" }}/>
    </Stack>
);

const NamePrice: FC<Partial<OrderItemType>> = ({ name, price, mos }) => {
    const { theme } = useDeskproAppTheme();
    return (
        <Stack justify="space-between" style={{ marginBottom: "8px" }}>
            <Stack vertical>
                <P5>{name}</P5>
                <P11 style={{ color: theme.colors.grey80 }}>{mos} mos</P11>
            </Stack>
            <Stack vertical align="end">
                <H0>{price}</H0>
                <P11>USD</P11>
            </Stack>
        </Stack>
    );
}

const DescriptionQty: FC<Partial<OrderItemType>> = ({ description, qty }) => (
    <Stack wrap="nowrap" align="stretch">
        <Stack grow={1} basis="49%">
            <TextBlockWithLabel
                label="Description"
                text={description}
            />
        </Stack>
        <VerticalDivider width={1} />
        <Stack grow={1} basis="49%">
            <TextBlockWithLabel
                label="Qty"
                text={qty}
            />
        </Stack>
    </Stack>
);

const Info: FC<Partial<OrderItemType> & { basis?: number }> = ({ basis, name, mos, price, description, qty }) => (
    <Stack basis={`${basis}%`} vertical align="stretch">
        <NamePrice name={name} price={price} mos={mos}/>
        <DescriptionQty description={description} qty={qty} />
    </Stack>
);

const OrderItem: FC<OrderItemType> = ({ mos, name, price, description, qty }) => {
    return (
        <>
            <Stack wrap="nowrap" gap={12}>
                <Image basis={20} name={name} />
                <Info basis={80} name={name} mos={mos} price={price} description={description} qty={qty} />
            </Stack>
            <HorizontalDivider style={{ margin: "10px 0" }} />
        </>
    );
};

export { OrderItem };
