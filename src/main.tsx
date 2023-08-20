import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

import { App } from "core/app";

import "./locales/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);