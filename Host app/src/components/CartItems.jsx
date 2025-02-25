import React, { lazy, Suspense } from "react";
const CartPage = lazy(() => import("Cart/Cart"));
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeToCart } from "../store/cartSlice";


function CartItems() {
  const cartItemsData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function removeFromCart(item) {
    dispatch(removeToCart(item))
  }
  function decreaseQuantityCallBack(item) {
    dispatch(decreaseQuantity(item))
  }
  function increaseQuantityCallBack(item) {
    dispatch(increaseQuantity(item))
  }
  return (
    <div>
      <Suspense fallback={null}>
        <CartPage cartItems={cartItemsData} removeFromCart={removeFromCart} decreaseQuantityCallBack={decreaseQuantityCallBack} increaseQuantityCallBack={increaseQuantityCallBack} />
      </Suspense>
    </div>
  );
}

export default CartItems;
