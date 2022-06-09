import { FC } from "react";
import styled from "styled-components";
import {
    H1,
    P1,
    P11,
    Stack,
    HorizontalDivider,
} from "@deskpro/app-sdk";
import { getDate } from "../../../utils";
import { Props } from "./types";

const Date = styled(P11)`
  white-space: nowrap;
  width: 100%;
  max-width: 52px;
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
                    <Date>{getDate(createdAt)}</Date>
                    <P1 dangerouslySetInnerHTML={{ __html: message }} />
                </Stack>
                <HorizontalDivider style={{ margin: "10px 0" }}/>
            </div>
        ))}
    </>
);

export { Comments };
