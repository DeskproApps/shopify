import { FC } from "react";
import styled from "styled-components";
import size from "lodash/size";
import ReactTimeAgo from "react-time-ago";
import { P5, P11, Stack } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { CommentEvent } from "../../../services/shopify/types";

type Props = {
  comments: CommentEvent[];
};

const DateContainer = styled(P11)`
  white-space: nowrap;
  width: 100%;
  max-width: 52px;
  min-width: 32px;
  color: ${({ theme }) => theme.colors.grey80};
`;

const Comments: FC<Props> = ({ comments }) => (
    <>
        <Title title={`Comments (${size(comments)})`} />
        {comments.map(({ id, message, createdAt }) => (
            <div key={id}>
                <Stack align="baseline">
                    <DateContainer>
                        <ReactTimeAgo date={new Date(createdAt)} timeStyle="mini" />
                    </DateContainer>
                    <P5 dangerouslySetInnerHTML={{ __html: message }} />
                </Stack>
                <HorizontalDivider style={{ margin: "10px 0" }}/>
            </div>
        ))}
    </>
);

export { Comments };
