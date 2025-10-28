import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./assets/pages/home.jsx";
import ProductsPage from "./assets/pages/products.jsx";
import Cart from "./assets/pages/cart.jsx";
import AdminLogin from "./assets/pages/adminLogin.jsx";
import PrivateRoute from "./assets/pages/privateRoute.jsx";
import CheckoutPage from "./assets/pages/checkout.jsx";
import OrderApproved from "./assets/pages/orderApproved.jsx";
import "./App.css";
import Admin from "./assets/pages/admin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
  );
}

export default App;
