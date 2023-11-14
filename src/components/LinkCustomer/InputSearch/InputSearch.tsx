import { FC } from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    Label,
    Input,
    AnyIcon,
    IconButton,
} from "@deskpro/deskpro-ui";
import { Props } from "./types";

const InputSearch: FC<Props> = ({ value, onChange, onClear }) => (
    <Label htmlFor="searchCustomer" label="Name or email address" required style={{ marginBottom: 5 }}>
        <Input
            id="searchCustomer"
            value={value}
            onChange={onChange}
            leftIcon={faSearch as AnyIcon}
            rightIcon={<IconButton icon={faTimes as never} minimal onClick={onClear} />}
        />
    </Label>
);

export { InputSearch };
