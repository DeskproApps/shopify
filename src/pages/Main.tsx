import { FC } from "react";
import { match } from "ts-pattern";
import {Context, useDeskproAppClient, useDeskproAppEvents } from "@deskpro/app-sdk";
import { Page } from "../context/StoreProvider/types";
import { useStore } from "../context/StoreProvider/hooks";
import { useTryToLinkCustomer } from "../hooks";
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

    useTryToLinkCustomer(
        () => dispatch({ type: "changePage", page: "home" }),
        () => dispatch({ type: "changePage", page: "link_customer" }),
    );

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        onChange: (context: Context) => {
            context && dispatch({ type: "loadContext", context: context });
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

    return page;
};
