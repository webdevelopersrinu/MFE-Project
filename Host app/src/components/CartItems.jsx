import React, { lazy, Suspense } from "react";
const CartPage = lazy(() => import("Cart/Cart"));
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeToCart } from "../store/cartSlice";

// const cartItems = [
//   {
//     id: 1,
//     name: "Men's Casual Shirt",
//     price: 1299,
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
//   },
//   {
//     id: 2,
//     name: "Women's Summer Dress",
//     price: 1899,
//     image:
//       "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//   },
//   {
//     id: 3,
//     name: "Unisex Sneakers",
//     price: 2499,
//     image:
//       "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//   },
//   {
//     id: 4,
//     name: "Men's Leather Wallet",
//     price: 999,
//     image:
//       "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//   },
//   {
//     id: 5,
//     name: "Women's Handbag",
//     price: 2799,
//     image:
//       "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//   },
// ];


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
