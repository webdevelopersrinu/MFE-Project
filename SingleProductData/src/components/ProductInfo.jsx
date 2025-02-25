import React from "react";
import "./ProductInfo.css";

function ProductInfo({ product }) {

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <div className="product-rating">
          <span>
            ⭐ 4.3 (5 reviews)
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
