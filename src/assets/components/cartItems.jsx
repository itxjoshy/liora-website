import React from "react";
import "../cart";

import { cart } from "../cart";
function CartItems() {
  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {cart.map((item, index) => (
        <div
          style={{
            background: "rgb(218, 99, 156)",
            borderRadius: "20px",
          }}
          key={index}
        >
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
            <p
              style={{
                color: "white",
                fontFamily: "Black Han Sans, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              {item.name}
            </p>
          </div>
          <p
            style={{
              padding: "0px 20px 10px 0px",
              marginTop: "-30px",
              justifySelf: "end",
              color: "white",
              fontFamily: "Black Han Sans, sans-serif",
            }}
          >
            quantity: {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
