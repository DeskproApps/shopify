import { FC } from "react";
import { LoadingSpinner, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { OAUTH2_ACCESS_TOKEN_PATH } from "@/constants";
import { useNavigate } from "react-router-dom";

const LogoutPage: FC = () => {
    const navigate = useNavigate();

    useInitialisedDeskproAppClient((client) => {
        client.setBadgeCount(0)

        client.deleteUserState(OAUTH2_ACCESS_TOKEN_PATH)
            .catch(() => { })
            .finally(() => {
                navigate("/login");
            });
    }, [navigate])

    return (<LoadingSpinner />)
}

export default LogoutPage