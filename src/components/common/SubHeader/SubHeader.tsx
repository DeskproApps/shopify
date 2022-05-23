import { FC } from "react";
import styled from "styled-components";
import { H1 } from "@deskpro/app-sdk";
import { ShopifyLink } from "../../common";
import { Stack } from "@deskpro/deskpro-ui";

type Props = {
    text: string,
    link: string,
    marginBottom?: number,
    onChangePage: () => void,
};

const Link = styled.a`
  color: ${({ theme }) => (theme.colors.cyan100)};
  text-decoration: none;
`;

const Container = styled(Stack)`
  margin: 0 8px 10px 0;
`;

const Title = styled(H1)`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => (theme.colors.cyan100)};
`;

const SubHeader: FC<Props> = ({ text, link, onChangePage, marginBottom = 10 }) => (
    <Container
        justify={"space-between"}
        align={"center"}
        style={{ marginBottom }}
    >
        <Title>
            <Link href="#" onClick={onChangePage}>
                {text}
            </Link>
        </Title>
        <ShopifyLink href={link}/>
    </Container>
);

export { SubHeader };
