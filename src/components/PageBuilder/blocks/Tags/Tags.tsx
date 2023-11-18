import { match } from "ts-pattern";
import size from "lodash/size";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Stack, Tag, lightTheme } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { AnyIcon, DeskproTheme } from "@deskpro/deskpro-ui";

type Props = {
  value: string[];
};

const getTagColorSchema = ({ colors }: DeskproTheme, tag: string) => {
  return match(tag.trim().toLowerCase())
    .with('vip', () => ({
      borderColor: colors.orange100,
      backgroundColor: `${colors.orange100}33`,
      textColor: colors.orange100,
    }))
    .with('development', () => ({
      borderColor: colors.turquoise100,
      backgroundColor: `${colors.turquoise100}33`,
      textColor: colors.turquoise100,
    }))
    .otherwise(() => ({
      borderColor: colors.grey80,
      backgroundColor: `${colors.grey80}33`,
      textColor: colors.grey80,
    }));
};

const Tags: FC<Props> = ({ value }) => {
  if (!Array.isArray(value) || !size(value)) {
    return (
      <>-</>
    );
  }

  return (
    <Stack gap={6} wrap="wrap">
      {value.map((tag) => (
        <Tag
          key={tag}
          color={getTagColorSchema(lightTheme, tag)}
          label={tag}
          closeIcon={faTimes as AnyIcon}
        />
      ))}
    </Stack>
  );
};

export { Tags };
