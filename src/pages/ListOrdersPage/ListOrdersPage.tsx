import { useCallback } from "react";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useLinkedCustomer, useExternalLink } from "../../hooks";
import { ListOrders } from "../../components";
import type { FC } from "react";
import type { Order } from "../../services/shopify/types";

const ListOrdersPage: FC = () => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const { getOrderLink } = useExternalLink();
    const { isLoading, orders } = useLinkedCustomer();

    useSetTitle(`Orders (${size(orders)})`);

    useRegisterElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
    }, [client]);

    const onNavigateToOrder = useCallback((orderId: Order['id']) => {
      navigate({ pathname: "/view_order", search: `?orderId=${orderId}` });
    }, [navigate]);

    if (isLoading) {
        return (<LoadingSpinner />);
    }

    return (
      <ListOrders
        orders={orders}
        getOrderLink={getOrderLink}
        onNavigateToOrder={onNavigateToOrder}
      />
    );
};

export { ListOrdersPage };
