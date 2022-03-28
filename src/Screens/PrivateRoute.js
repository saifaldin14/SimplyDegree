import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context";

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
