import { FC } from "react";
import {
    Pill,
    Stack,
    VerticalDivider,
    DeskproAppTheme,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { SubHeader, TextBlockWithLabel } from "../../common";
import { Props } from "./types";

const statusNames = {
    onHold: "On hold",
    fulfilled: "Fulfilled",
    unfulfilled: "Unfulfilled",
    partially: "Partially fulfilled",
    scheduled: "Scheduled",
};

const getStatusColorSchema = (theme: DeskproAppTheme['theme']) => ({
    onHold: theme.colors.jasper80,
    partially: theme.colors.turquoise100,
    fulfilled: theme.colors.turquoise100,
    unfulfilled: theme.colors.red100,
    scheduled: theme.colors.cyan100
});

const OrderInfo: FC<Props> = ({ id, orderName, date, status, onChangePage }) => {
    const { theme } = useDeskproAppTheme();
    const statusColorSchema = getStatusColorSchema(theme);

    return (
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
                                textColor={theme.colors.white}
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
}

export { OrderInfo };
