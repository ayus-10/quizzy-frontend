import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedUserProvider from "./providers/authenticated-user.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticatedUserProvider>
        <App />
      </AuthenticatedUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
