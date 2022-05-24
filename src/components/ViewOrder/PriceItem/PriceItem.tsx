import { FC } from "react";
import styled from "styled-components";
import { H1, Stack } from "@deskpro/app-sdk";

type Props = {
    title: string,
    price: string,
} & Record<string, unknown>;

const Container = styled(Stack)`
  margin: 0 8px 10px 0;
`;

const PriceItem: FC<Props> = ({ title, price, ...props }) => (
    <Container justify="space-between" {...props}>
        <H1>{title}:</H1>
        <H1>{price} USD</H1>
    </Container>
);

export { PriceItem };
