import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import EmployeeTable from "./pages/EmployeeTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeTable></EmployeeTable>,
  },
  {
    path: "/hello",
    element: <EmployeeTable></EmployeeTable>,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
