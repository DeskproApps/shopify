import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const ListOrders: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>ListOrders</h1>
            <Button
                text="toViewOrder"
                onClick={() => dispatch({ type: "changePage", page: "view_order" })}
            />
        </>
    );
};
