import { useState, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { setOrder } from "../../services/shopify";
import { getApiErrors } from "../../utils";
import { useOrder } from "../../hooks";
import { EditOrderForm, getOrderValues } from "../../components/EditOrder";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormProps } from "../../components/EditOrder";

const EditOrderPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { client } = useDeskproAppClient();
  const { isLoading, order } = useOrder(orderId);
  const [error, setError] = useState<Maybe<string | string[]>>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSubmit: FormProps["onSubmit"] = useCallback((values) => {
    if (!client || !order) {
      return Promise.resolve();
    }

    setError(null);

    return setOrder(client, order.id, getOrderValues(values, order))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(({ data }/*{ orderUpdate: { userErrors } }*/) => {
        const orderErrors = get(data, ["orderUpdate", "userErrors"]);

        if (isEmpty(orderErrors)) {
          navigate({ pathname: `/view_order`, search: `?orderId=${order.id}` });
        } else {
          setError(getApiErrors(orderErrors));
        }
      })
      .catch((error) => get(error, ["errors"], error));
  }, [client, navigate, order]);

  const onCancel = useCallback(() => {
    navigate({ pathname: `/view_order`, search: `?orderId=${orderId}` });
  }, [navigate, orderId]);

  useSetTitle(`Edit Order ${!order?.legacyResourceId
    ? ""
    : `#${order.legacyResourceId}`}`
  );

  useRegisterElements(({registerElement}) => {
    registerElement("home", {
      type: "home_button",
      payload: {type: "changePage", path: "/home"}
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <EditOrderForm
      order={order}
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditOrderPage };
