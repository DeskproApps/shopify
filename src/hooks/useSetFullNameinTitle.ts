import { useEffect } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getFullName } from "../utils";

const useSetFullNameInTitle = (): void => {
    const [state] = useStore();
    const { client } = useDeskproAppClient();

    useEffect(() => {
        client?.setTitle(getFullName({
            firstName: state.customer?.first_name,
            lastName: state.customer?.last_name,
        }));
    }, [client, state.customer?.first_name, state.customer?.last_name]);
};

export { useSetFullNameInTitle };
