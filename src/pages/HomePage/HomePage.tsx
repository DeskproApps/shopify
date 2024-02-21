import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { PageBuilder } from "@deskpro/app-builder";
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

    // return (
    //   <>HomePage</>
    // );
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
    /*return (
      <>
        <PageBuilder
          store={{ customer, orders }}
          config={{
            structure: [
                ["fullName"],
                ["email"],
                ["totalSpent"],
                ["note"],
                ["---"],
                // ["ordersTitle"],
                ["orders"],
            ],
            blocks: {
                fullName: {
                    type: "title",
                    pathInStore: ["customer", "displayName"],
                    props: {
                        link: `${getCustomerLink(customer?.legacyResourceId)}`,
                        to: `/view_customer?customerId=${customer?.id}`,
                    },
                },
                email: {
                    type: "text",
                    label: "Email",
                    pathInStore: ["customer", "email"],
                },
                totalSpent: {
                    type: "price",
                    label: "Total Spent",
                    pathInStore: ["customer", "amountSpent"],
                    props: {
                        mapper: {
                            amount: "amount",
                            currency: "currencyCode",
                        },
                    },
                },
                note: {
                    type: "text",
                    label: "Note",
                    pathInStore: ["customer", "note"],
                },
                "---": {
                    type: "divider",
                    full: true,
                },
                /!*ordersTitle: {
                    type: "title",
                    props: {
                        value: "Orders",
                        to: `/list_orders`,
                        link: `${getOrdersLink()}`,
                    },
                },*!/
                orders: {
                    type: "iterable",
                    pathInStore: ["orders"],
                    config: {
                      structure: [
                        ["title"],
                        ["date", "status"],
                      ],
                      blocks: {
                        title: {
                          type: "title",
                          pathInStore: ["id"],
                        },
                        date: {
                          type: "text",
                          label: "Date",
                          pathInStore: ["createdAt"],
                        },
                        status: {
                          type: "text",
                          label: "Status",
                          pathInStore: ["displayFulfillmentStatus"],
                        },
                      },
                    },
                },
            },
          }}
        />
      </>
    );*/
};

export { HomePage };
