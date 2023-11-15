import { Suspense, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { StoreProvider } from "./context/StoreProvider";
import { ErrorFallback } from "./components/ErrorFallback";
import { App } from "./App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "iframe-resizer/js/iframeResizer.contentWindow.js";

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render((
    <StrictMode>
      <DeskproAppProvider>
        <HashRouter>
          <StoreProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner/>}>
                <App />
              </Suspense>
            </ErrorBoundary>
          </StoreProvider>
        </HashRouter>
      </DeskproAppProvider>
    </StrictMode>
));
