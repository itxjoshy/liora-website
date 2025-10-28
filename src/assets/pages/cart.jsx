import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cart } from "../cart";
import "./cart.css";
import Header from "../components/header";
import CartEmpty from "../components/cartEmpty";
import CartItems from "../components/cartItems";
import Footer from "../components/footer";

const cartIsEmpty = !cart.length;
export const totalItems = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};
function Cart() {
  const navigate = useNavigate();

  const total = totalItems();
  return (
    <>
      <Header />
      <div className="container cart-page">
        <div className="cart-items">
          {cartIsEmpty ? <CartEmpty /> : <CartItems />}
        </div>
        <div className="cart-summary">
          <h2>Checkout Details</h2>
          <p>Total Items: {total}</p>
          <p>Total Price: N {total * 30000}</p>
          <div
            style={{
              justifySelf: "end",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              gap: "10px",
            }}
          >
            <button
              className="checkout-button"
              onClick={() => navigate(`/checkout`)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
