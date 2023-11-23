import { FC } from "react";
import styled from "styled-components";
import truncate from "lodash/truncate";
import { H0, P11, Stack } from "@deskpro/deskpro-ui";
import {
    Title,
    Property,
    TwoProperties,
    HorizontalDivider,
} from "@deskpro/app-sdk";
import { formatPrice } from "../../../utils";
import { DPNormalize } from "../../common";
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
    originalUnitPriceSet: { presentmentMoney: { amount, currencyCode } },
}) => (
    <Stack justify="space-between">
        <Title title={title} marginBottom={0} />
        <Stack vertical align="end">
          <H0>{formatPrice(amount, { style: "decimal" })}</H0>
          <P11>{currencyCode}</P11>
        </Stack>
    </Stack>
);

const DescriptionBlock: FC<OrderItemType> = ({ sku, quantity, product: { description } }) => (
  <>
    <TwoProperties
      leftLabel="Sku"
      leftText={sku}
      rightLabel="Qty"
      rightText={quantity}
    />
    <Property
      label="Description"
      text={<DPNormalize text={truncate(description, { length: 130 })}/>}
    />
  </>
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
                </CardBody>
            </Card>
            <DescriptionBlock {...item} />
            {!isLast && <HorizontalDivider style={{ margin: "10px 0" }} />}
        </>
    );
};

export { OrderItem };
