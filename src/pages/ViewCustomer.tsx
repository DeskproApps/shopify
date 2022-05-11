import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const ViewCustomer: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>ViewCustomer</h1>
            <Button
                text="toEditCustomer"
                onClick={() => dispatch({ type: "changePage", page: "edit_customer" })}
            />
        </>
    );
};
