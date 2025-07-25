
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const authStatus = isAuthenticated();

  if (authStatus.valid) {
    alert("You are already logged in"); 
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

export default PublicRoute;
