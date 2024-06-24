import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WithoutQuery from "./pages/WithoutQuery";
import WithQuery from "./pages/WithQuery";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    // Traditional data fetching component
    path: "/withoutquery",
    element: <WithoutQuery />,
  },
  {
    // Using TanStack/React Query for data fetching component
    path: "/withquery",
    element: <WithQuery />,
  },
]);
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
