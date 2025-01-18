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
    const response = await fetch("/v1/api/users", {
      // Ensure correct API path with a leading '/'
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Includes cookies in the request
    });

    if (response.ok) {
      const data = await response.json();
      return data.user || {}; // Return user data if available
    } else {
      console.error("Failed to fetch user details. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }

  return {}; // Return an empty object if there's an error
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
  );
};

initializeApp();
