import { useState, useEffect } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { getEntityCustomerList } from "../../services/entityAssociation";
import { getCustomer } from "../../services/shopify";
import { ListOrders } from "../../components";
import type { FC } from "react";
import type { Order, CustomerType } from "../../services/shopify/types";

const ListOrdersPage: FC = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();
    const [loading, setLoading] = useState<boolean>(true);
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    useSetTitle(`Orders (${size(customer?.numberOfOrders)})`);

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    }, [client]);

    useEffect(() => {
        if (!client) {
            return;
        }

        setLoading(true);

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                const { orders } = customer;

                setCustomer(customer);
                setOrders(orders);
                setLoading(false);
            })
            .catch((error: Error) => {
                setLoading(false);
                dispatch({ type: "error", error: get(error, ["errors"], error) })
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    const onNavigateToOrder = (orderId: Order['id']) => {
        navigate({ pathname: "/view_order", search: `?orderId=${orderId}` });
    };

    if (loading) {
        return (<LoadingSpinner />);
    }

    return (
      <ListOrders
        state={state}
        orders={orders}
        onNavigateToOrder={onNavigateToOrder}
      />
    );
};

export { ListOrdersPage };
