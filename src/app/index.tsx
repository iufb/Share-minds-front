import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { appStarted } from "src/shared/config";
appStarted()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
