import { FC } from "react";
import { Stack, Button } from "@deskpro/deskpro-ui";
import { CustomerType } from "../../../services/shopify/types";

type Props = {
    selectedId: CustomerType["id"] | null,
    isEditMode: boolean,
    onSave: () => void,
    onCancel: () => void,
};

const Footer: FC<Props> = ({
    selectedId,
    isEditMode,
    onSave,
    onCancel,
}) => (
    <Stack justify="space-between" style={{ margin: "14px 0 8px" }}>
        <Button
            disabled={!isEditMode && !selectedId}
            text={isEditMode ? "Save" : "Add"}
            onClick={onSave}
            style={{ minWidth: "70px", justifyContent: "center" }}
        />
        {isEditMode && (
            <Button
                text="Cancel"
                intent="tertiary"
                onClick={onCancel}
                style={{ minWidth: "70px", justifyContent: "center" }}
            />
        )}
    </Stack>
);

export { Footer };
