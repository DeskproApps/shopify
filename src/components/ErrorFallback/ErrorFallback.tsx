import { get, map } from "lodash";
import { DEFAULT_ERROR } from "../../constants";
import { ShopifyError } from "../../services/shopify";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
    error: Error|ShopifyError,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  let message: string|string[] = DEFAULT_ERROR;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof ShopifyError) {
    message = map(get(error, ["data", "errors"], []), "message")
      || DEFAULT_ERROR;
  }

  return (
    <Container>
      <ErrorBlock
        text={message}
      />
    </Container>
  );
};

export { ErrorFallback };
