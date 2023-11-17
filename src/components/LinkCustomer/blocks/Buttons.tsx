import size from "lodash/size";
import { FC } from "react";
import { Stack, Button } from "@deskpro/deskpro-ui";
import { CustomerType } from "../../../services/shopify/types";

type Props = {
    selectedId: CustomerType["id"] | null,
    isEditMode: boolean,
    onSave: () => void,
    onCancel: () => void,
    isSubmitting: boolean,
};

const Buttons: FC<Props> = ({
    selectedId,
    isEditMode,
    onSave,
    onCancel,
    isSubmitting,
}) => (
    <Stack justify="space-between">
        <Button
            type="button"
            text={isEditMode ? "Save" : "Add"}
            onClick={onSave}
            disabled={!size(selectedId) || isSubmitting}
            loading={isSubmitting}
            style={{ minWidth: "70px", justifyContent: "center" }}
        />
        {isEditMode && (
            <Button
                type="button"
                text="Cancel"
                intent="tertiary"
                onClick={onCancel}
                style={{ minWidth: "70px", justifyContent: "center" }}
            />
        )}
    </Stack>
);

export { Buttons };
