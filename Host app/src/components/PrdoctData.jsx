import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const ProductCard = lazy(() => import("Product/ProductCard"));

function PrdoctData({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInViewMap, setIsInViewMap] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isInViewMap")) || {};
  });

  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInViewMap((prev) => {
                const newMap = { ...prev, [entry.target.dataset.id]: true };
                sessionStorage.setItem("isInViewMap", JSON.stringify(newMap)); // ✅ Persist state
                return newMap;
              });
              observer.unobserve(entry.target); // ✅ Unobserve once loaded
            }
          });
        },
        { threshold: 0.1 }
      );
    }

    // ✅ Re-observe all elements when component remounts
    setTimeout(() => {
      document.querySelectorAll("[data-id]").forEach((node) => {
        if (node && observerRef.current) {
          observerRef.current.observe(node);
        }
      });
    }, 500); // 🔥 Small delay ensures DOM is ready

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [products]); // ✅ Run again if products change

  // Callback ref to assign observer dynamically
  const setImageRef = (id) => (node) => {
    if (node && observerRef.current) {
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
            imageRef={setImageRef(item.id)}
            isInView={isInViewMap[item.id] || false}
          />
        ))}
      </Suspense>
    </div>
  );
}

export default PrdoctData;
