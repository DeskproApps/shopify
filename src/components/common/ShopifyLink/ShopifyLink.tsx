import styled from "styled-components";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import {
    Icon,
    Stack,
    RoundedLabelTag,
} from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import { ShopifyLogo } from "./ShopifyLogo";
import { Props } from "./types";

const Container = styled(Stack)`
  padding: 2px;
`;

const Link = styled.a`
    color: ${({ theme }) => (theme.colors.brandShade100)}
`;

const ShopifyIcon = styled(Icon)`
    display: inline-block !important;
    width: 12px;
    height: 12px;
    padding: 0 6px 0 0;
`;

const ShopifyLink = ({ href }: Props) => {
    const { theme } = useDeskproAppTheme();

    return (
        <RoundedLabelTag
            size="small"
            withClose={false}
            backgroundColor={theme.colors.brandShade20}
            textColor="#4C4F50"
            borderColor={theme.colors.brandShade20}
            closeIcon={faArrowUpRightFromSquare}
            label={(
                <Container>
                    <ShopifyIcon icon={<ShopifyLogo/>} />
                    <Link target="_blank" href={href}>
                        <Icon icon={faArrowUpRightFromSquare} />
                    </Link>
                </Container>
            )}
        />
    );
}

export { ShopifyLink }
