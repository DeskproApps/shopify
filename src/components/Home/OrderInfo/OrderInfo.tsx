import { FC } from "react";
import {
    Pill,
    Stack,
    lightTheme,
    VerticalDivider,
    HorizontalDivider,
} from "@deskpro/app-sdk";
import { SubHeader } from "../../common/SubHeader";
import { TextBlockWithLabel } from "../../common/TextBlockWithLabel";
import { Props } from "./types";

const statusNames = {
    onHold: "On hold",
    fulfilled: "Fulfilled",
    unfulfilled: "Unfulfilled",
    partially: "Partially fulfilled",
    scheduled: "Scheduled",
};

const statusColorSchema = {
    onHold: lightTheme.colors.jasper80,
    partially: lightTheme.colors.turquoise100,
    fulfilled: lightTheme.colors.turquoise100,
    unfulfilled: lightTheme.colors.red100,
    scheduled: lightTheme.colors.cyan100
};

const OrderInfo: FC<Props> = ({ id, orderName, date, status, onChangePage }) => (
    <>
        <SubHeader
            text={orderName}
            link="https://__shop_name__.myshopify.com/admin/orders/<order_id>"
            onChangePage={() => onChangePage(id)}
        />
        <Stack align="stretch" style={{ marginBottom: 10 }}>
            <Stack grow={1}>
                <TextBlockWithLabel marginBottom={0} label="Date" text={date}/>
            </Stack>
            <VerticalDivider width={1} />
            <Stack grow={1}>
                <TextBlockWithLabel
                    marginBottom={0}
                    label="Status"
                    text={(
                        <Pill
                            textColor={lightTheme.colors.white}
                            backgroundColor={statusColorSchema[status]}
                            label={statusNames[status]}
                        />
                    )}
                />
            </Stack>
        </Stack>
        <HorizontalDivider style={{ marginBottom: 9 }}/>
    </>
);

export { OrderInfo };
