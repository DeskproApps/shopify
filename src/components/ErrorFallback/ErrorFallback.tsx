import { FallbackRender } from "@sentry/react";
import { DEFAULT_ERROR } from "../../constants";
import { ShopifyError } from "../../services/shopify";
import { Container, ErrorBlock } from "../common";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message: string|string[] = DEFAULT_ERROR;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof ShopifyError) {
    let arrayOfErrors: string[] = [];

    if (Array.isArray(error.data?.errors)) {
      arrayOfErrors = error.data?.errors
        .map((e) => (typeof e === "string") ? e : e.message)
        .filter(Boolean);
    }

    message = arrayOfErrors.length > 0 ? arrayOfErrors : DEFAULT_ERROR;
  }

  return (
    <Container>
      <ErrorBlock text={message}/>
    </Container>
  );
};

export { ErrorFallback };
