import { useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";

const useSetFullNameInTitle = (): void => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();

    useEffect(() => {
        if (state.customer?.displayName) {
            client?.setTitle(state.customer?.displayName);
        }
    }, [client, state.customer?.displayName]);
};

export { useSetFullNameInTitle };
