import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Landing } from "./pages/Landing";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { EditProfile } from "./pages/EditProfile";
import { Issues } from "./pages/Issues";
import { Users } from "./pages/Users";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth allowedRoles={["admin", "user"]} />,
    children: [
      { index: true, element: <Home /> },
      { path: "edit-profile", element: <EditProfile /> },
      {
        path: "users",
        element: <RequireAuth allowedRoles={["admin"]} />,
        children: [{ index: true, element: <Users /> }],
      },
    ],
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
    path: "/issues",
    element: <RequireAuth allowedRoles={["admin"]} />,
    children: [{ index: true, element: <Issues /> }],
  },
  {
    path: "/unauthorized",
    element: <div>Unauthorized</div>,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
