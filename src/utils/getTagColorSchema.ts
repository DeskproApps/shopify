import { DeskproAppTheme } from "@deskpro/app-sdk";
import { match } from "ts-pattern";

const getTagColorSchema = (theme: DeskproAppTheme['theme'], tag: string) => {
    return match(tag.trim().toLowerCase())
        .with('vip', () => ({
            borderColor: theme.colors.orange100,
            backgroundColor: theme.colors.orange10,
        }))
        .with('development', () => ({
            borderColor: theme.colors.turquoise100,
            backgroundColor: theme.colors.turquoise10,
        }))
        .otherwise(() => ({
            borderColor: theme.colors.grey80,
            backgroundColor: theme.colors.grey10,
        }));
};

export { getTagColorSchema };
