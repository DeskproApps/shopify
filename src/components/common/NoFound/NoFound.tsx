import { FC } from "react";
import { P5 } from "@deskpro/deskpro-ui";

export type Props = {
  text?: string,
};

const NoFound: FC<Props> = ({ text = "No found" } = {}) => (
  <P5>{text}</P5>
);

export { NoFound };
