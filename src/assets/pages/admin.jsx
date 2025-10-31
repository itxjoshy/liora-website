import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import logo from "../logo.png";
import "./admin.css";

function Admin() {
  const [view, setView] = useState("dashboard"); // dashboard, products, orders, inventory, settings
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [locked, setLocked] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [settings, setSettings] = useState({
    paymentKey: "",
    adminUser: "",
  });

  useEffect(() => {
    try {
      // Listen to live changes in the "orders" collection
      const unsubscribeOrders = onSnapshot(
        collection(db, "orders"),
        (snapshot) => {
          const orderList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(orderList);
        }
      );

      // Listen to live changes in the "products" collection
      const unsubscribeProducts = onSnapshot(
        collection(db, "products"),
        (snapshot) => {
          const productList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productList);
        }
      );

      //lock website
      //const lockWebsite = getDoc(collection(db, "settings"));

      // Cleanup: stop listening when component unmounts
      return () => {
        unsubscribeOrders();
        unsubscribeProducts();
      };
    } catch (e) {
      console.log("Error setting up listeners:", e);
    }
  }, []);

  const updateStatus = async (orderId, status = "confirmed") => {
    try {
      // Directly point to the document
      const yes = window.confirm(`Mark order as ${status} ?`);
      if (!yes) return;
      const orderRef = doc(db, "orders", orderId);
      // Update just the "status" field
      await updateDoc(orderRef, {
        status: status,
        confirmedAt: serverTimestamp(),
      });
      alert("Order Approved");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // ORDERS: update status
  const updateOrderStatus = (orderId, status) => {
    setOrders((list) =>
      list.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // INVENTORY: edit qty
  const updateStock = async (productId, qty) => {
    try {
      setProducts((p) =>
        p.map((x) =>
          x.id === productId
            ? {
                ...x,
                stock: Number(qty),
              }
            : x
        )
      );
    } catch (e) {
      console.error("Error updating quantity:", error);
    }
  };

  //update live stock
  const updateLivestock = async (productId, qty, productName) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        stock: Number(qty),
      });
      alert(`${productName}, quantity sucessfully updated to ${qty} ✅`);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const toggleSoldOut = (productId) => {
    setProducts((p) =>
      p.map((x) => (x.id === productId ? { ...x, stock: 0 } : x))
    );
  };

  // STORE LOCK
  const toggleLock = () => {
    const yes = window.confirm(
      `${locked ? "Unlock" : "Lock"} storefront? This will ${
        locked ? "re-enable" : "disable"
      } the public site.`
    );
    if (!yes) return;
    setLocked((v) => !v);
    alert(`Storefront ${locked ? "unlocked" : "locked"}.`);
    window.dispatchEvent(new Event("storeLockChanged"));
  };

  // SETTINGS: save
  const saveSettings = (e) => {
    e.preventDefault();
    setSettings((s) => ({ ...s })); // already bound
    alert("Settings saved.");
  };

  // Simple counts
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img
            src={logo}
            alt=""
            style={{
              width: "100%",
            }}
          />
          <p
            style={{
              color: "rgba(243, 73, 155, 1)",
            }}
          >
            Admin
          </p>
        </div>
        <nav>
          <button
            className={view === "dashboard" ? "active" : ""}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={view === "orders" ? "active" : ""}
            onClick={() => setView("orders")}
          >
            Orders
          </button>
          <button
            className={view === "inventory" ? "active" : ""}
            onClick={() => setView("inventory")}
          >
            Inventory
          </button>
          <button
            className={view === "settings" ? "active" : ""}
            onClick={() => setView("settings")}
          >
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="lock-row">
            <span className="lock-label">{locked ? "Locked" : "Live"}</span>
            <button className="lock-btn" onClick={toggleLock}>
              {locked ? "Unlock" : "Lock"}
            </button>
          </div>
          <small className="version">Liora · Admin · v1</small>
        </div>
      </aside>

      <section className="admin-main">
        {view === "dashboard" && (
          <section className="panel">
            <h2>Overview</h2>
            <div className="cards">
              <div className="card">
                <h3>{totalProducts}</h3>
                <p>Products</p>
              </div>
              <div className="card">
                <h3>{totalOrders}</h3>
                <p>Orders</p>
              </div>
              <div className="card">
                <h3>{outOfStock}</h3>
                <p>Sold out</p>
              </div>
            </div>
            <div className="recent">
              <h4>Recent Orders</h4>
              <ul className="orders-list">
                {orders.slice(0, 6).map((o) => (
                  <li key={o.id}>
                    <div className={o.id}>
                      <strong>{o.id}</strong> — {o.customer}
                      <div className="muted">
                        {o.items.length} items • N{o.total}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        gap: 40,
                      }}
                    >
                      <div className={`status ${o.status}`}>{o.status}</div>
                      <button
                        style={{
                          background: "rgb(218, 99, 156)",
                        }}
                        onClick={() => updateStatus(o.id)}
                      >
                        Approve
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {view === "orders" && (
          <section className="panel">
            <h2>Orders</h2>
            <div className="orders-table">
              {orders.map((o) => (
                <div className="order-row" key={o.id}>
                  <div className="left">
                    <strong>{o.customer}</strong>
                    <div className="muted">{o.id}</div>
                  </div>
                  <div className="center">
                    {o.items.map((it, i) => (
                      <div key={i} className="order-item">
                        {it.name} × {it.quantity}
                      </div>
                    ))}
                  </div>
                  <div className="right">
                    <div className="muted">N{o.total}</div>
                    <select
                      value={o.status}
                      onChange={(e) => {
                        updateOrderStatus(o.id, e.target.value);
                        updateStatus(o.id, e.target.value);
                      }}
                    >
                      <option value="-">-</option>
                      <option value="confirmed">confirmed</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                    <div className="muted">{o.payment}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === "inventory" && (
          <section className="panel">
            <h2>Inventory</h2>
            <div className="inventory-list">
              {products.length === 0 ? (
                <p className="muted">No products.</p>
              ) : (
                products.map((p) => (
                  <div className="inventory-row" key={p.id}>
                    <div className="inv-left">
                      <img src={p.image} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <div className="muted">{p.variant}</div>
                      </div>
                    </div>
                    <div className="inv-right">
                      <input
                        type="number"
                        min={0}
                        value={p.stock}
                        onChange={(e) => {
                          updateStock(p.id, e.target.value);
                          setQuantity(e.target.value);
                        }}
                      />
                      <button
                        className="btn-ghost"
                        onClick={() => toggleSoldOut(p.id)}
                      >
                        Mark sold out
                      </button>
                      <button
                        className="btn-ghost"
                        onClick={() => {
                          updateLivestock(p.id, quantity, p.name);
                        }}
                      >
                        Update Quantity
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {view === "settings" && (
          <section className="panel">
            <h2>Settings</h2>
            <form className="settings-form" onSubmit={saveSettings}>
              <label>Payment Gateway Key</label>
              <input
                value={settings.paymentKey}
                onChange={(e) =>
                  setSettings({ ...settings, paymentKey: e.target.value })
                }
              />
              <label>Admin Username</label>
              <input
                value={settings.adminUser}
                onChange={(e) =>
                  setSettings({ ...settings, adminUser: e.target.value })
                }
              />
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>

            <div className="danger">
              <h4>Storefront</h4>
              <p className="muted">
                Toggle to disable the public site for maintenance or restock.
              </p>
              <div className="lock-control">
                <span>Status: {locked ? "Locked (maintenance)" : "Live"}</span>
                <button className="btn-primary" onClick={toggleLock}>
                  {locked ? "Unlock" : "Lock"} storefront
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default Admin;
