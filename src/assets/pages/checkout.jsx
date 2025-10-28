import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cart } from "../cart";
import "../pages/checkout.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { db } from "../../firebase";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

function CheckoutPage() {
  const navigate = useNavigate();
  //default form
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = cart.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    let id = "";
    e.preventDefault();
    // basic validation
    if (
      !form.fullName ||
      !form.phone ||
      !form.address1 ||
      !form.city ||
      !form.postalCode
    ) {
      alert(
        "Please complete name, phone and delivery address (address, city, postal code)."
      );
      return;
    }

    setSubmitting(true);

    async function handleCheckout() {
      try {
        //incase cart somehow manages to be 0 and reach this point
        if (cart.length === 0) {
          alert("Cant Place Order");
          navigate("/");
          throw new Error("Empty cart");
        }
        const total = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        const orderData = {
          items: cart.map((i) => ({
            productId: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size || null,
          })),
          total,
          customer: form.fullName,
          contact: { phone: form.phone, email: form.email },
          deliveryAddress: {
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
          },
          instructions: form.instructions,
          status: "pending",
          createdAt: serverTimestamp(),
          confirmedAt: null,
        };

        //send to firebase database
        const docRef = await addDoc(collection(db, "orders"), orderData);
        alert(
          `Order placed — We'll contact you to confirm delivery.Order placed with ID: `,
          docRef.id
        );
        id = docRef.id;
        // optionally redirect or clear form
        navigate(`/orderApproved/${id}`);
        // clear cart
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new Event("cartUpdated"));
        console.log("Order Data: ", orderData);
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Failed to place order. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
    handleCheckout();
  };
  return (
    <div>
      <Header />

      <div className="checkout-page container">
        <div className="checkout-user-info ">
          <h2>Delivery details</h2>
          <p>Please enter the recipient's details and delivery address.</p>

          <form
            onSubmit={handleSubmit}
            className="delivery-form"
            style={{ display: "grid", gap: 12, marginTop: 12 }}
          >
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name *"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number *"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email (optional)"
            />

            <input
              name="address1"
              value={form.address1}
              onChange={handleChange}
              placeholder="Address line 1 *"
            />
            <input
              name="address2"
              value={form.address2}
              onChange={handleChange}
              placeholder="Address line 2"
            />

            <div style={{ display: "flex", gap: 8 }}>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City *"
                style={{ flex: 1 }}
              />
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                style={{ width: 120 }}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal code *"
                style={{ width: 160 }}
              />
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                style={{ flex: 1 }}
              />
            </div>

            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Delivery instructions (gate codes, preferred time, etc.)"
              rows={3}
            />
          </form>
        </div>
        <div className="summary">
          <h2>Order Summary</h2>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",

                gap: 10,
              }}
            >
              <img src={item.image} alt="" />
              <div>
                <h3>{item.name}</h3>
                <p>
                  Quantity: {item.quantity} | Size: {item.size || "N/A"} |
                  Price: N {item.price}
                </p>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting
                ? "Placing order..."
                : `Place order • N ${totalPrice.toLocaleString()}`}
            </button>
            <button
              type="button"
              className="btn-clear"
              onClick={() => {
                if (confirm("Clear details?"))
                  setForm({
                    fullName: "",
                    phone: "",
                    email: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "Nigeria",
                    instructions: "",
                  });
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
