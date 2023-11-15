import { FC } from "react";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useTryToLinkCustomer } from "../hooks";

const LoadingApp: FC = () => {
    const navigate = useNavigate();

    useTryToLinkCustomer(
        () => navigate("/home"),
        () => navigate("/link_customer"),
    );

    return (
        <LoadingSpinner/>
    );
};

export { LoadingApp };
