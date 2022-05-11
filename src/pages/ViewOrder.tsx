import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const ViewOrder: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>ViewOrder</h1>
            <Button
                text="toViewOrder"
                onClick={() => dispatch({ type: "changePage", page: "edit_order" })}
            />
        </>
    );
};
