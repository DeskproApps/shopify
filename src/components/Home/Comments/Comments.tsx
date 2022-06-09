import { FC } from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import {
    H1,
    P1,
    P11,
    Stack,
    HorizontalDivider,
} from "@deskpro/app-sdk";
import { Props } from "./types";

const DateContainer = styled(P11)`
  white-space: nowrap;
  width: 100%;
  max-width: 52px;
  min-width: 32px;
  color: ${({ theme }) => theme.colors.grey80};
`;

const Title = styled(H1)`
    margin-bottom: 15px;
`;

const Comments: FC<Props> = ({ comments }) => (
    <>
        <Title>Comments ({comments.length})</Title>
        {comments.map(({ id, message, createdAt }) => (
            <div key={id}>
                <Stack align="baseline">
                    <DateContainer>
                        <ReactTimeAgo date={new Date(createdAt)} timeStyle="mini" />
                    </DateContainer>
                    <P1 dangerouslySetInnerHTML={{ __html: message }} />
                </Stack>
                <HorizontalDivider style={{ margin: "10px 0" }}/>
            </div>
        ))}
    </>
);

export { Comments };
