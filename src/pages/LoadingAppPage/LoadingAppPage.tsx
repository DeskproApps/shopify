import { FC } from "react";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import { useTryToLinkCustomer, useRegisterElements } from "../../hooks";

const LoadingAppPage: FC = () => {
    const navigate = useNavigate();

    useRegisterElements(({ registerElement }) => {
      registerElement("refresh", { type: "refresh_button" });
    });

    useTryToLinkCustomer(
        () => navigate("/home"),
        () => navigate("/link_customer"),
    );

    return (
        <LoadingSpinner/>
    );
};

export { LoadingAppPage };
