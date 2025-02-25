import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
const ProductCard = lazy(() => import("Product/ProductCard"));


function PrdoctData({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInViewMap, setIsInViewMap] = useState({});

  // Create a single observer instance
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewMap((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    return () => observerRef.current.disconnect();
  }, []);

  // Callback ref to be used in each ProductCard
  const setImageRef = (id) => (node) => {
    if (node) {
      observerRef.current.observe(node);
    }
  };

  const callbackFun = (mag) => {
    navigate(`/product-info?id=${mag.id}`);
  };
  const addToCartCallBack = (data) => {
    dispatch(addToCart(data));
    toast.success("Product added to cart");
  };

  return (
    <div className="product-container">
      <Suspense fallback={<div>Loading Products...</div>}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            callback={callbackFun}
            addToCartCallBack={addToCartCallBack}
            imageRef={setImageRef(item.id)}  // Using callback ref here
            isInView={isInViewMap[item.id] || false}
          />
        ))}
      </Suspense>
    </div>
  );
}

export default PrdoctData;