import React from "react";
import "./Cart.css";

const CartPage = ({ cartItems, removeFromCart, increaseQuantityCallBack, decreaseQuantityCallBack }) => {
  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-image" />
              <div className="cart-details">
                <h2 className="cart-name">{item.title}</h2>
                <p className="cart-price">₹{item.price}</p>
              </div>
              <div className="cart-quantity">
                <button className="quantity-button" onClick={() => decreaseQuantityCallBack(item)}>-</button>
                <p className="quantity">{item.quantity}</p>
                <button className="quantity-button" onClick={() => increaseQuantityCallBack(item)}>+</button>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
