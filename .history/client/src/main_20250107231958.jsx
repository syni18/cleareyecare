import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import store from "./redux/store.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./redux/context/userProvider.jsx";

const queryClient = new QueryClient();

const initializeApp = async () => {

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <App />
          </UserProvider>
        </QueryClientProvider>
      {/* </Provider> */}
    </React.StrictMode>
  );
};

initializeApp();
