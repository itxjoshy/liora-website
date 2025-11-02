import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import SiteLock from "./assets/pages/siteLock.jsx";
import Home from "./assets/pages/home.jsx";
import ProductsPage from "./assets/pages/products.jsx";
import Cart from "./assets/pages/cart.jsx";
import AdminLogin from "./assets/pages/adminLogin.jsx";
import PrivateRoute from "./assets/pages/privateRoute.jsx";
import CheckoutPage from "./assets/pages/checkout.jsx";
import OrderApproved from "./assets/pages/orderApproved.jsx";
import "./App.css";
import Admin from "./assets/pages/admin.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";

function App() {
  const cached = localStorage.getItem("storefrontLocked");
  const [storefrontLocked, setStorefrontLocked] = useState(() => {
    return cached ? JSON.parse(cached) : false;
  });

  const [loading, setLoading] = useState(cached == null);
  useEffect(() => {
    function fetchStoreLockStatus() {
      const docRef = doc(db, "settings", "sitefrontlock");
      const docSnap = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setStorefrontLocked(data.locked);
            localStorage.setItem(
              "storefrontLocked",
              JSON.stringify(data.locked)
            );
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching lock status:", error);
          setLoading(false);
        }
      );
    }
    return () => fetchStoreLockStatus();
  }, []);

  if (false) return <div>Loading...</div>;

  return (
    console.log("storefrontLocked:", storefrontLocked),
    (
      <Router>
        <Routes>
          <Route
            path="/"
            element={storefrontLocked ? <SiteLock /> : <Home />}
          />
          <Route path="/products/:id/:slug" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderApproved/:id" element={<OrderApproved />} />
        </Routes>
      </Router>
    )
  );
}

export default App;
