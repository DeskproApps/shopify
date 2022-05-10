import { FC } from "react";
import { Button, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getShopInfo } from '../context/StoreProvider/api';

export const Main: FC = () => {
    useInitialisedDeskproAppClient((client) => {
        getShopInfo(client)
            .then((shopInfo) => console.log(shopInfo))
            .catch((err) => console.error(err));
    });

    return (
        <Button text="My App" />
    );
};
