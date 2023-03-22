import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "iframe-resizer/js/iframeResizer.contentWindow.js";
import "./index.css";

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render((
    <React.StrictMode>
        <App />
    </React.StrictMode>
));
