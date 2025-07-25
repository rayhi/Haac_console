
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authStatus = isAuthenticated();

  if (!authStatus.valid) {
    // Display the unauthorized reason
    alert(`Unauthorized: ${authStatus.reason}`); // You can replace this with a toast or modal
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
