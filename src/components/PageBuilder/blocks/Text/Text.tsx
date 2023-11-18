import styled, { css } from "styled-components";
import { P5 } from "@deskpro/deskpro-ui";
import type { FC } from "react";

export const dpNormalize = css`
  p {
    margin-top: 0;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-child,
  ol:first-child,
  ul:first-child {
    margin-top: 0;
  }

  ol, ul {
    padding-inline-start: 20px;
  }

  img {
    width: 100%;
    height: auto;
  }

  a, a:hover {
    color: ${({ theme }) => theme.colors.cyan100};
  }
`;

type Props = {
  value: string|number;
};

const DPNormalize = styled.div`
  width: 100%;

  ${dpNormalize}
`;

const Text: FC<Props> = ({ value }) => {
  return (
    <DPNormalize>
      <P5 dangerouslySetInnerHTML={{ __html: value }} />
    </DPNormalize>
  );
}

export { Text };
