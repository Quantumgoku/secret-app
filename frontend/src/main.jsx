import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import {
  useNavigate,
  createBrowserRouter,
  RouterProvider,
  // Outlet,
} from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./auth.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App></App>
      </>
    ),
  },
  {
    path: "/auth/:action",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <NextUIProvider navigate={useNavigate}>
        <RouterProvider router={router}></RouterProvider>
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);
