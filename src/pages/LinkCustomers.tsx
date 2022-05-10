import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const LinkCustomers: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>LinkCustomers</h1>
            <p>
                <Button
                    text="Add"
                    onClick={() => dispatch({ type: "changePage", page: "home" })}
                />
            </p>
        </>
    )
};
