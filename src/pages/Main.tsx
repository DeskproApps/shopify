import { FC } from "react";
import { match } from "ts-pattern";
import { Page } from "../context/StoreProvider/types";
import { useStore } from "../context/StoreProvider/hooks";
import { Home } from "./Home";
import { ViewOrder } from "./ViewOrder";
import { EditOrder } from "./EditOrder";
import { ListOrders } from "./ListOrders";
import { ViewCustomer } from "./ViewCustomer";
import { EditCustomer } from "./EditCustomer";
import { LinkCustomers } from "./LinkCustomers";


export const Main: FC = () => {
    const [state] = useStore();

    const page = match<Page|undefined>(state.page)
        .with("home", () => <Home {...state.pageParams} />)
        .with("link_customers", () => <LinkCustomers {...state.pageParams} />)
        .with("view_customer", () => <ViewCustomer {...state.pageParams} />)
        .with("edit_customer", () => <EditCustomer {...state.pageParams} />)
        .with("list_orders", () => <ListOrders {...state.pageParams} />)
        .with("view_order", () => <ViewOrder {...state.pageParams} />)
        .with("edit_order", () => <EditOrder {...state.pageParams} />)
        .otherwise(() => <LinkCustomers {...state.pageParams} />)

    return page;
};
