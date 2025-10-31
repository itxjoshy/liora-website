import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import logo from "../logo.png";
import { cart } from "../cart";
import { totalItems } from "../pages/cart";

function Header() {
  const [cartLength, setCartLength] = useState(totalItems);

  useEffect(() => {
    const updateCartLength = () => setCartLength(totalItems);
    window.addEventListener("cartUpdated", updateCartLength);
    return () => window.removeEventListener("cartUpdated", updateCartLength);
  }, []);

  return (
    <>
      <div className="banner">
        Only 50 pieces available! Get yours now! - Free shipping on all orders
        above N70,000
      </div>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="actions">
          <a href="/cart">
            <button className="cart" style={{ position: "relative" }}>
              <FontAwesomeIcon className="icon" icon={faCartShopping} />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  background: "red",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  display: cartLength > 0 ? "flex" : "none",
                }}
              >
                {cartLength}
              </div>
            </button>
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
