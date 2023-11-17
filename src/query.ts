import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const QueryKey = {
  LINKED_CONTACTS: "linked-contacts",
  CUSTOMER: "customer",
  CUSTOMERS: "customers",
  ORDER: "order",
}

export { queryClient, QueryKey };
