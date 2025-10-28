import React from "react";
import { useNavigate } from "react-router-dom";

function ProductList({ items }) {
  const navigate = useNavigate();
  return (
    <div className="products-section-grid">
      {items.map((item, idx) => {
        const priceNumber = Number(item.price || 0);
        const formattedPrice = priceNumber.toLocaleString(); // adds commas every three digits
        return (
          <div
            className="product-card"
            key={item.id || idx}
            id={item.id}
            onClick={() => navigate(`products/${item.id}/${item.slug}`)}
          >
            <img src={item.image} alt={item.name} />
            <div className="product-desc">
              <h3>{item.name}</h3>
              <p>N {formattedPrice}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
