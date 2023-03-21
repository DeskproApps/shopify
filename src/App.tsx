import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { StoreProvider } from "./context/StoreProvider";
import { ErrorFallback } from "./components/ErrorFallback";
import { Main } from "./pages/Main";
import "./App.css";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

function App() {
  return (
      <DeskproAppProvider>
          <StoreProvider>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingSpinner/>}>
                      <Main/>
                  </Suspense>
              </ErrorBoundary>
          </StoreProvider>
      </DeskproAppProvider>
  );
}

export default App;
