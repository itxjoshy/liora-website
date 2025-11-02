import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, locked }) {
  if (locked) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
