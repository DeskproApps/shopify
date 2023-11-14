import { FC } from "react";
import styled from "styled-components";
import { Stack } from "@deskpro/deskpro-ui";

type Props = {
    text?: string | JSX.Element | Array<string | JSX.Element>,
}

const StyledErrorBlock = styled(Stack)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.red100};
  margin-bottom: 8px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  width: 100%;
`;

export const ErrorBlock: FC<Props> = ({ text = "An error occurred" }) => (
    <StyledErrorBlock className="error-block">
        {Array.isArray(text) ? text.map((msg, idx) => (
            <div key={idx}>{msg}</div>
        )) : text}
    </StyledErrorBlock>
);
