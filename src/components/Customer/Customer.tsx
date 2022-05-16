import { FC } from "react";
import { Props } from "./types";

const Customer: FC<Props> = ({ onChange, id, first_name, last_name, email }) => (
    <label style={{display: "block"}}>
        <input
            type="radio"
            value={id}
            name="selectedCustomerId"
            onChange={onChange}
        />
        {first_name} {last_name}<br/>
        &lt;{email}&gt;
    </label>
);

export { Customer };
