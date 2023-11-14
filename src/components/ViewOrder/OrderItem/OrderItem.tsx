import { FC } from "react";
import styled from "styled-components";
import { H0, P5, P8, P11, Stack } from "@deskpro/deskpro-ui";
import {
    VerticalDivider,
    HorizontalDivider,
    useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { TextBlockWithLabel } from "../../common";
import { OrderItemType } from "../../../services/shopify/types";

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

const Title = styled(P5)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Header: FC<OrderItemType> = (({
    title,
    originalUnitPriceSet: { presentmentMoney: { amount } },
}) => (
    <Stack justify="space-between">
        <Title>{title}</Title>
        <H0>{amount}</H0>
    </Stack>
));

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

const Qty = styled(P8)`
    color: ${({ theme }) => theme.colors.grey80};
`;

const DescriptionBlock: FC<OrderItemType> = ({ quantity, product: { description } }) => (
    <Stack wrap="nowrap" align="stretch" gap={6}>
        <div style={{ width: "50%" }}>
            <Qty>Description</Qty>
            <Description>{description}</Description>
        </div>
        <VerticalDivider width={1} />
        <div style={{ width: "50%" }}>
            <TextBlockWithLabel
                label="Qty"
                text={`${quantity}`}
            />
        </div>
    </Stack>
);

const OrderItem: FC<OrderItemType> = (props) => {
    const { image, title } = props;

    return (
        <>
            <Card>
                <CardMedia>
                    <img src={image.url} alt={title} />
                </CardMedia>
                <CardBody>
                    <Header {...props} />
                    <SubHeader {...props} />
                    <DescriptionBlock {...props} />
                </CardBody>
            </Card>
            <HorizontalDivider style={{ margin: "10px 0" }} />
        </>
    );
};

export { OrderItem };
