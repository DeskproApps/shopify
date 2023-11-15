import isString from "lodash/isString";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "./utils";
import { useStore } from "./context/StoreProvider/hooks";
import { ErrorBlock } from "./components/common";
import {
  HomePage,
  ViewOrderPage,
  EditOrderPage,
  LoadingAppPage,
  ListOrdersPage,
  EditCustomerPage,
  ViewCustomerPage,
  LinkCustomerPage,
} from "./pages";
import type { FC } from "react";
import type { Context } from "@deskpro/app-sdk";
import type { EventPayload } from "./types";

const App: FC = () => {
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
        <Route path="home" element={<HomePage />}/>
        <Route path="link_customer" element={<LinkCustomerPage />}/>
        <Route path="view_customer" element={<ViewCustomerPage />}/>
        <Route path="edit_customer" element={<EditCustomerPage />}/>
        <Route path="list_orders" element={<ListOrdersPage />}/>
        <Route path="view_order" element={<ViewOrderPage />}/>
        <Route path="edit_order" element={<EditOrderPage />}/>
        <Route index element={<LoadingAppPage />}/>
      </Routes>
    </>
  );
}

export { App };
