import { FC } from "react";
import styled from "styled-components";
import { P8, P5 } from "@deskpro/app-sdk";
import { Props } from "./types";

const Container = styled.div<Props>`
    margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

const Label = styled(P8)`
    color: ${({ theme }) => (theme.colors.grey80)};
`;

const TextBlockWithLabel: FC<Props> = ({ text, label, marginBottom = 10 }) => (
    <Container marginBottom={marginBottom}>
        {label && <Label>{label}</Label>}
        {text && <P5>{text}</P5>}
    </Container>
);

export { TextBlockWithLabel };
