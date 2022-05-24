import { FC, useCallback } from "react";
import { match } from "ts-pattern";
import {Context, useDeskproAppClient, useDeskproAppEvents } from "@deskpro/app-sdk";
import { Page, AppElementPayload } from "../context/StoreProvider/types";
import { useStore } from "../context/StoreProvider/hooks";
import { useTryToLinkCustomer } from "../hooks";
import { ErrorBlock } from "../components/common";
import { Home } from "./Home";
import { ViewOrder } from "./ViewOrder";
import { EditOrder } from "./EditOrder";
import { ListOrders } from "./ListOrders";
import { ViewCustomer } from "./ViewCustomer";
import { EditCustomer } from "./EditCustomer";
import { LinkCustomer } from "./LinkCustomer";

export const Main: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();

    if (state._error) {
        console.error(state._error);
    }

    useTryToLinkCustomer(
        useCallback(() => dispatch({ type: "changePage", page: "home" }), [dispatch]),
        useCallback(() => dispatch({ type: "changePage", page: "link_customer" }), [dispatch]),
    );

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        onChange: (context: Context) => {
            context && dispatch({ type: "loadContext", context: context });
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent(id: string, type: string, payload?: AppElementPayload) {
            if (payload?.type === "changePage") {
                dispatch({ type: "changePage", page: payload.page })
            }
        },
    });

    const page = match<Page|undefined>(state.page)
        .with("home", () => <Home {...state.pageParams} />)
        .with("link_customer", () => <LinkCustomer {...state.pageParams} />)
        .with("view_customer", () => <ViewCustomer {...state.pageParams} />)
        .with("edit_customer", () => <EditCustomer {...state.pageParams} />)
        .with("list_orders", () => <ListOrders {...state.pageParams} />)
        .with("view_order", () => <ViewOrder {...state.pageParams} />)
        .with("edit_order", () => <EditOrder {...state.pageParams} />)
        .otherwise(() => <LinkCustomer {...state.pageParams} />)

    return (
        <>
            {state._error && (<ErrorBlock text="An error occurred" />)}
            {page}
        </>
    );
};
