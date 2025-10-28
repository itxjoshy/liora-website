import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminEmail = "lioraadmin@liora.com"; // your admin email

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("PrivateRoute user:", user);
      if (user && user.email === adminEmail) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="admin-login-loader">Checking login status...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
