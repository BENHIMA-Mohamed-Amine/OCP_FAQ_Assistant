import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { EditProfile } from "./pages/EditProfile";
import { Issues } from "./pages/Issues";
import { PrimeReactProvider } from "primereact/api";
// import "primeflex/primeflex.css";
// import "primereact/resources/primereact.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./index.css";
import "./flag.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/issues",
    element: <Issues />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>
);
