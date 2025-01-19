import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./redux/context/userProvider.jsx";

const queryClient = new QueryClient();

const initializeApp = async () => {

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <App />
          </UserProvider>
        </QueryClientProvider>
    </React.StrictMode>
  );
};

initializeApp();
