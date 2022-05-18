import { FC } from "react";
import { Button } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

export const EditOrder: FC = () => {
    const [ , dispatch] = useStore();

    return (
        <>
            <h1>EditOrder</h1>
            <Button
                text="toLinkCustomer"
                onClick={() => dispatch({ type: "changePage", page: "link_customer" })}
            />
        </>
    );
};
