import { FC } from "react";
import { match } from "ts-pattern";
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

const getStatusName = (status: string | null = '') => {
    if (!status) {
        return 'Unfulfilled';
    }

    return match(status.trim().toLowerCase().replaceAll(' ', ''))
        .with("onhold", () => "On hold")
        .with("partially", () => "Partially fulfilled")
        .with("fulfilled", () => "Fulfilled")
        .with("scheduled", () => "Scheduled")
        .with("unfulfilled", () => "Unfulfilled")
        .otherwise(() => "Unfulfilled");
};

const getStatusColorSchema = (theme: DeskproAppTheme['theme'], status: string | null = '') => {
    if (!status) {
        return theme.colors.red100
    }

    return match(status.trim().toLowerCase().replaceAll(' ', ''))
        .with("onhold", () => theme.colors.jasper80)
        .with("partially", () => theme.colors.turquoise100)
        .with("fulfilled", () => theme.colors.turquoise100)
        .with("scheduled", () => theme.colors.cyan10)
        .with("unfulfilled", () => theme.colors.red100)
        .otherwise(() => theme.colors.red100);
};

const OrderInfo: FC<Props> = ({
    id,
    linkOrder,
    onChangePage,
    line_items,
    created_at,
    fulfillment_status,
}) => {
    const { theme } = useDeskproAppTheme();
    const title = line_items.map(({ title }) => title).join(' & ');

    return (
        <>
            <SubHeader
                text={title}
                link={linkOrder}
                onChangePage={() => onChangePage(id)}
            />
            <Stack align="stretch" style={{ marginBottom: 10 }}>
                <Stack grow={1}>
                    <TextBlockWithLabel
                        marginBottom={0}
                        label="Date"
                        text={(new Date(created_at)).toLocaleDateString()}
                    />
                </Stack>
                <VerticalDivider width={1} />
                <Stack grow={1}>
                    <TextBlockWithLabel
                        marginBottom={0}
                        label="Status"
                        text={(
                            <>
                                <Pill
                                    textColor={theme.colors.white}
                                    backgroundColor={getStatusColorSchema(theme, fulfillment_status)}
                                    label={getStatusName(fulfillment_status)}
                                />
                            </>
                        )}
                    />
                </Stack>
            </Stack>
            <HorizontalDivider style={{ marginBottom: 9 }}/>
        </>
    );
}

export { OrderInfo };
