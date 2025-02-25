import React from "react";
import "./EcommerceCard.css";

const EcommerceCard = ({
  product,
  callback,
  addToCartCallBack,
  imageRef,
  isInView,
}) => {

  const handleClick = () => {
    callback(product);
  };

  const handleAddToCart = () => {
    addToCartCallBack(product);
  };

  return (
    <div className="card">
      <div data-id={product.id} ref={imageRef}>
        {isInView ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="card-image"
            onClick={handleClick}
            loading="lazy"
          />
        ) : (
          <div className="image-loading">Loading...</div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">${product.price}</p>
        <button className="card-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default EcommerceCard;
