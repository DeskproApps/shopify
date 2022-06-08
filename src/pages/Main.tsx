import { FC } from "react";
import { match } from "ts-pattern";
import {
    Context,
    useDeskproAppClient,
    useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { Page, AppElementPayload } from "../context/StoreProvider/types";
import { useStore } from "../context/StoreProvider/hooks";
import { useTryToLinkCustomer } from "../hooks";
import { ErrorBlock, Loading } from "../components/common";
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
        console.error(`Shopify: ${state._error}`);
    }

    const { loading } = useTryToLinkCustomer(
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent(id: string, type: string, payload?: AppElementPayload) {
            if (payload?.type === "changePage") {
                dispatch({ type: "changePage", page: payload.page, params: payload.params })
            }
        },
    });

    const page = match<Page|undefined>(state.page)
        .with("home", () => <Home />)
        .with("link_customer", () => <LinkCustomer />)
        .with("view_customer", () => <ViewCustomer />)
        .with("edit_customer", () => <EditCustomer />)
        .with("list_orders", () => <ListOrders />)
        .with("view_order", () => <ViewOrder />)
        .with("edit_order", () => <EditOrder />)
        .otherwise(() => <LinkCustomer />)

    return (
        <>
            {state._error && (<ErrorBlock text="An error occurred" />)}
            {loading
                ? (<Loading />)
                : page
            }
        </>
    );
};
