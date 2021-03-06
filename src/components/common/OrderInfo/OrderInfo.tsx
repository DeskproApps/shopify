import { FC } from "react";
import {
    Pill,
    Stack,
    VerticalDivider,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { SubHeader, TextBlockWithLabel } from "../../common";
import { getShippingStatusName, getShippingStatusColorSchema, getDate } from "../../../utils";
import { Props } from "./types";

const OrderInfo: FC<Props> = ({
    id,
    createdAt,
    lineItems,
    linkOrder,
    onChangePage,
    displayFulfillmentStatus,
}) => {
    const { theme } = useDeskproAppTheme();
    const title = lineItems.map(({ title }) => title).join(' & ');

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
                        text={getDate(createdAt)}
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
                                    backgroundColor={getShippingStatusColorSchema(theme, displayFulfillmentStatus)}
                                    label={getShippingStatusName(displayFulfillmentStatus)}
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
