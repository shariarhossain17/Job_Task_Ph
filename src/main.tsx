import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import CvMaker from "./pages/CvMaker";
import EmployeeTable from "./pages/EmployeeTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeTable></EmployeeTable>,
  },
  {
    path: "/cv-maker",
    element: <CvMaker></CvMaker>,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
