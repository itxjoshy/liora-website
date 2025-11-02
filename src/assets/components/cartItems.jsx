import React from "react";
import "./cartitems.css";
import "../cart";

import { cart } from "../cart";
function CartItems() {
  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "200px",
                  height: "100px",
                  objectFit: "contain",
                  objectPosition: "center",
                  marginTop: "5px",
                }}
              />
            </div>
            <div>
              <p className="item-name">{item.name}</p>
              <p className="item-quantity">quantity: {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
