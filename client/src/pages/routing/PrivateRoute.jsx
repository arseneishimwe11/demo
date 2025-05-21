import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles = [] }) => {
  // Check if user is authenticated
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If roles are specified, check if user has required role
  if (roles.length > 0) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!roles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }
  }

  return children;
};

export default PrivateRoute;
