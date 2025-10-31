import React, { useState, useEffect } from "react";
import "../pages/products.css";
import logo from "../Logo.png";
import Header from "../components/header.jsx";
import { cart } from "../cart";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function ProductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState([]);
  const [Filteredproduct, setFilteredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = () => {
    const itemToAdd = {
      ...Filteredproduct,
      quantity,
      size: selectedSize,
    };
    cart.push(itemToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Item added to cart!");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const product = productsList.find((item) => item.id === id);
        setFilteredProduct(product);
        setProduct(productsList);
        console.log("Fetched products:", productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  //Loading state
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          background: "rgba(238, 238, 238, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "20%",
            marginTop: "-100px",
          }}
          src={logo}
          alt="loading"
          className="loading-logo"
        />
      </div>
    );

  //error state
  if (error) return <p className="text-red-500">{error}</p>;

  // Not found
  if (!Filteredproduct) return <p>Product not found.</p>;
  return (
    <>
      <div
        className="wrapper"
        style={{ minHeight: "100vh", background: "rgb(229, 229, 229)" }}
      >
        <Header />
        <div className="products-page container">
          <div className="product-display">
            <img src={Filteredproduct.image} alt={Filteredproduct.name} />
            <p>Shipping might take 5 to 7 days depending on location</p>
          </div>
          <div className="product-selector">
            <button
              className="back-button"
              onClick={() => navigate("/")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "0.95rem",
                left: 60,
                top: 30,
                position: "absolute",
                textAlign: "left",
                color: "rgb(218, 99, 156)",
              }}
            >
              ← Back
            </button>

            <h1>{Filteredproduct.name}</h1>
            <h2> N {Filteredproduct.price.toLocaleString()}</h2>
            <div className="product-sizes">
              <label htmlFor="size-select">Size</label>
              <select
                id="size-select"
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div
              style={{
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                id="quantity-select"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  marginLeft: "10px",
                  width: "9rem",
                  padding: "15px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid black",
                  color: " rgb(218, 99, 156)",
                  fontSize: "1.2rem",
                  MozAppearance: "textfield", // Firefox
                }}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button onClick={addToCart} className="add-to-cart">
                Add to Cart
              </button>
            </div>
            <div></div>
            <div className="product-info">
              <h3>Product Details</h3>
              <ul>
                <li>Made from premium cotton for a soft, durable feel</li>
                <li>Relaxed streetwear fit with drop shoulders</li>
                <li>Designed for everyday wear — from streets to studios</li>
                <li>Comes with free Liora sticker pack</li>
                <li>One shirt for all genders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsPage;
