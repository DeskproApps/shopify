import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  ViewOrderPage,
  EditOrderPage,
  LoadingAppPage,
  ListOrdersPage,
  VerifySettings,
  EditCustomerPage,
  ViewCustomerPage,
  LinkCustomerPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  });

  return (
    <Routes>
      <Route path="/admin/verify_settings" element={<VerifySettings/>} />
      <Route path="/home" element={<HomePage />}/>
      <Route path="/link_customer" element={<LinkCustomerPage />}/>
      <Route path="/view_customer" element={<ViewCustomerPage />}/>
      <Route path="/edit_customer" element={<EditCustomerPage />}/>
      <Route path="/list_orders" element={<ListOrdersPage />}/>
      <Route path="/view_order" element={<ViewOrderPage />}/>
      <Route path="/edit_order" element={<EditOrderPage />}/>
      <Route index element={<LoadingAppPage />}/>
    </Routes>
  );
}

export { App };
