import {FC, useState, useEffect, useCallback} from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useStore } from "../../context/StoreProvider/hooks";
import { Home } from "../../components";
import { getEntityCustomerList } from "../../services/entityAssociation";
import { getCustomer } from "../../services/shopify";
import { Order, CustomerType } from "../../services/shopify/types";

const HomePage: FC = () => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const userId = state.context?.data.ticket?.primaryUser.id || state.context?.data.user.id;

    const onNavigateToCustomer = useCallback((customerId: CustomerType["id"]) => {
      navigate({ pathname: "/view_customer", search: `?customerId=${customerId}` });
    }, [navigate]);

    const onNavigateToOrder = useCallback((orderId: Order['legacyResourceId']) => {
        navigate({ pathname: `/view_order`, search: `?orderId=${orderId}` });
    }, [navigate]);

    const onNavigateToOrders = useCallback(() => {
        navigate("/list_orders")
    }, [navigate]);

    useSetTitle("Shopify Customer");

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });
        registerElement("menu", {
            type: "menu",
            items: [{
                title: "Change Linked Customer",
                payload: {
                    type: "changePage",
                    path: `/link_customer?customerId=${customer?.id}`,
                },
            }],
        });
    }, [customer?.id])

    useEffect(() => {
        if (!client) {
            return;
        }

        getEntityCustomerList(client, userId)
            .then((customers: string[]) => {
                return getCustomer(client, customers[0]);
            })
            .then(({ customer }) => {
                const { orders } = customer;
                setCustomer(customer);
                setOrders(orders);
            })
            .catch((error: Error) => {
                dispatch({ type: "error", error: get(error, ["errors"], error) })
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, userId]);

    return !customer
        ? state._error ? null : (<LoadingSpinner />)
        : (
          <Home
            state={state}
            orders={orders || []}
            customer={customer}
            onNavigateToCustomer={onNavigateToCustomer}
            onNavigateToOrders={onNavigateToOrders}
            onNavigateToOrder={onNavigateToOrder}
          />
      );
};

export { HomePage };
