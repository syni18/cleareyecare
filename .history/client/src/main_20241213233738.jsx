import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./redux/context/UserContext.jsx";

const fetchUserDetails = async () => {
  try {
    const response = await fetch("v1/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.user || {};
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {}; // Return empty object if fetch fails
  }
  return {};
};
const queryClient = new QueryClient();
const initializeApp = async () => {
  const user = await fetchUserDetails(); // Fetch user details before rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider initialUser={user}>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
 )
};

