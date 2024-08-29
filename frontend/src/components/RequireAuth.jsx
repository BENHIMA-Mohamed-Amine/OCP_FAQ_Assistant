import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth || Object.keys(auth).length === 0) {
    // If auth is empty, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes(auth?.role)) {
    return <Outlet />;
  }

  // If user is authenticated but doesn't have the required role
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default RequireAuth;
