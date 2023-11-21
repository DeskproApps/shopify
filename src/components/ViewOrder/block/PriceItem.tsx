import styled from "styled-components";
import { H1, Stack } from "@deskpro/deskpro-ui";
import { formatPrice } from "../../../utils";
import type { FC } from "react";
import type { Money } from "../../../services/shopify/types";

type Props =
    & Money
    & { title: string }
    & Record<string, unknown>;

const Container = styled(Stack)`
  margin: 0 8px 10px 0;
`;

const PriceItem: FC<Props> = ({ title, amount, currencyCode, ...props }) => (
    <Container justify="space-between" {...props}>
        <H1>{title}:</H1>
        <H1>{formatPrice(amount, { currency: currencyCode })}</H1>
    </Container>
);

export { PriceItem };
