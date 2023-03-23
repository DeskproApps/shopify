import { FC } from "react";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { useTryToLinkCustomer } from "../hooks";

const LoadingApp: FC = () => {
    const [, dispatch] = useStore();

    useTryToLinkCustomer(
        () => dispatch({ type: "changePage", page: "home" }),
        () => dispatch({ type: "changePage", page: "link_customer" }),
    );

    return (
        <LoadingSpinner/>
    );
};

export { LoadingApp };
