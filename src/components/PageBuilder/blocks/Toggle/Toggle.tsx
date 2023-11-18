import get from "lodash/get";
import toLower from "lodash/toLower";
import { Toggle as ToggleUI } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { ToggleProps } from "@deskpro/deskpro-ui";
import type { BlockRules } from "../../types";

type Props = ToggleProps & {
  rules: BlockRules,
  value: string,
};

const Toggle: FC<Props> = ({ value, rules, ...props}) => (
  <ToggleUI
    checked={toLower(value) === toLower(get(rules, ["eq"]))}
    {...props}
  />
);

export { Toggle };
