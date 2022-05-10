import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const Home: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>Home</h1>
            <Button
                text="toListOrder"
                onClick={() => dispatch({ type: "changePage", page: "list_orders" })}
            />
            <Button
                text="toViewCustomer"
                onClick={() => dispatch({ type: "changePage", page: "view_customer" })}
            />
        </>
    );
};
