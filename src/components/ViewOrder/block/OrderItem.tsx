import { FC } from "react";
import styled from "styled-components";
import { H0, P5, P11, Stack } from "@deskpro/deskpro-ui";
import {
    Title,
    TwoProperties,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { formatPrice } from "../../../utils";
import type { OrderItemType } from "../../../services/shopify/types";

const Card = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
`;

const CardMedia = styled.div`
    > * {
        width: 50px;
        border-radius: 4px;
    }
`;

const CardBody = styled.div`
    width: calc(100% - 50px - 12px);
`;

const Header: FC<OrderItemType> = ({
    title,
    originalUnitPriceSet: { presentmentMoney: { amount } },
}) => (
    <Stack justify="space-between">
        <Title title={title} />
        <H0>{formatPrice(amount, { style: "decimal" })}</H0>
    </Stack>
);

const SubHeader: FC<OrderItemType> = (({
    sku,
    originalUnitPriceSet: { presentmentMoney: { currencyCode } }
}) => {
    const { theme } = useDeskproAppTheme();

    return (
        <Stack justify="space-between" style={{ marginBottom: 10 }}>
            <P11 style={{ color: theme.colors.grey80 }}>{sku}</P11>
            <P11>{currencyCode}</P11>
        </Stack>
    )
});

const Description = styled(P5)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionBlock: FC<OrderItemType> = ({ quantity, product: { description } }) => (
  <TwoProperties
    leftLabel="Description"
    leftText={<Description>{description}</Description>}
    rightLabel="Qty"
    rightText={quantity}

  />
);

const OrderItem: FC<{ item: OrderItemType, isLast: boolean }> = ({ item, isLast }) => {
    const { image, title } = item;

    return (
        <>
            <Card>
                <CardMedia>
                    <img src={image.url} alt={title} />
                </CardMedia>
                <CardBody>
                    <Header {...item} />
                    <SubHeader {...item} />
                    <DescriptionBlock {...item} />
                </CardBody>
            </Card>
            {!isLast && <HorizontalDivider style={{ margin: "10px 0" }} />}
        </>
    );
};

export { OrderItem };
