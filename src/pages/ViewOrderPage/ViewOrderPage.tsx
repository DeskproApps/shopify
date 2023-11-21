import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useExternalLink,
  useRegisterElements,
} from "../../hooks";
import { useOrder } from "../../hooks";
import { ViewOrder } from "../../components";
import type { FC } from "react";

const ViewOrderPage: FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { isLoading, order } = useOrder(orderId);
    const { getOrderLink } = useExternalLink();
    const orderLink = useMemo(() => {
      return getOrderLink(order?.legacyResourceId);
    }, [getOrderLink, order]);

    useSetTitle(order?.legacyResourceId ? `#${order?.legacyResourceId}` : "Shopify");

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" }
        });
        registerElement("refresh", { type: "refresh_button" });
        registerElement("menu", {
            type: "menu",
            items: [{
                title: "Cancel order",
                payload: { type: "changePage", path: "/list_orders" },
            }],
        });
        if (orderLink) {
            registerElement("external", {
                type: "cta_external_link",
                url: orderLink,
                hasIcon: true,
            });
        }
        if (orderId) {
            registerElement("edit", {
                type: "edit_button",
                payload: {
                    type: "changePage",
                    path: { pathname: `/edit_order`, search: `?orderId=${orderId}` }
                },
            });
        }
    }, [orderId, orderLink]);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
      <ViewOrder order={order}/>
    );
};

export { ViewOrderPage };
