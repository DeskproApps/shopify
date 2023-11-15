import isString from "lodash/isString";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
    useDeskproAppClient,
    useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "../utils";
import { useStore } from "../context/StoreProvider/hooks";
import { ErrorBlock } from "../components/common";
import { Home } from "./Home";
import { LoadingApp } from "./LoadingApp";
import { ViewOrder } from "./ViewOrder";
import { EditOrder } from "./EditOrder";
import { ListOrders } from "./ListOrders";
import { ViewCustomer } from "./ViewCustomer";
import { EditCustomer } from "./EditCustomer";
import { LinkCustomer } from "./LinkCustomer";
import type { FC } from "react";
import type { Context } from "@deskpro/app-sdk";
import type { EventPayload } from "../types";

export const Main: FC = () => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .run();
  }, 500);

    if (state._error) {
        // eslint-disable-next-line no-console
        console.error(`Shopify:`, state._error);
    }

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        onChange: (context: Context) => {
            context && dispatch({ type: "loadContext", context: context });
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent: debounceElementEvent,
    });

    return (
        <>
            {state._error && (
                <ErrorBlock
                    text={isString(state._error) ? state._error : "An error occurred"}
                />
            )}
            <Routes>
              <Route path="home" element={<Home />}/>
              <Route path="link_customer" element={<LinkCustomer />}/>
              <Route path="view_customer" element={<ViewCustomer />}/>
              <Route path="edit_customer" element={<EditCustomer />}/>
              <Route path="list_orders" element={<ListOrders />}/>
              <Route path="view_order" element={<ViewOrder />}/>
              <Route path="edit_order" element={<EditOrder />}/>
              <Route index element={<LoadingApp />}/>
            </Routes>
        </>
    );
};
