import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useExternalLink,
  useRegisterElements,
} from "../../hooks";
import { useLinkedCustomer } from "../../hooks";
import { Home } from "../../components";
import { Order, CustomerType } from "../../services/shopify/types";

const HomePage: FC = () => {
    const navigate = useNavigate();
    const { getCustomerLink, getOrdersLink, getOrderLink } = useExternalLink();
    const { isLoading, customer, orders } = useLinkedCustomer();

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
        if (customer?.id) {
          registerElement("menu", {
              type: "menu",
              items: [{
                  title: "Change Linked Customer",
                  payload: {
                      type: "changePage",
                      path: `/link_customer?customerId=${customer.id}`,
                  },
              }],
          });
        }
    }, [customer?.id])

    if (isLoading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
        <Home
          orders={orders || []}
          customer={customer}
          onNavigateToCustomer={onNavigateToCustomer}
          onNavigateToOrders={onNavigateToOrders}
          onNavigateToOrder={onNavigateToOrder}
          getCustomerLink={getCustomerLink}
          getOrdersLink={getOrdersLink}
          getOrderLink={getOrderLink}
        />
    );
};

export { HomePage };
