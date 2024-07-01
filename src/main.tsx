import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedUserProvider from "./providers/authenticated-user.provider.tsx";
import ReduxProvider from "./providers/redux.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <AuthenticatedUserProvider>
          <App />
        </AuthenticatedUserProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
