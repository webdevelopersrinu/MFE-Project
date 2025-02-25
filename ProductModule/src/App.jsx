import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import EcommerceCard from "./components/EcommerceCard.jsx";

const App = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInViewMap, setIsInViewMap] = useState({});
  const imageRefs = useRef({});

  function callback(msg) {
    console.log(msg);
  }

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=190");
      const data = await response.json();
      setProductData(data.products);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Initialize a ref for each product
  const getImageRef = (id) => {
    if (!imageRefs.current[id]) {
      imageRefs.current[id] = React.createRef();
    }
    console.log("Generated Ref for:", id, imageRefs.current[id]); // Debugging
    return imageRefs.current[id];
  };


  // Intersection Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Entry Observed:", entry.target.dataset.id, "Is in View:", entry.isIntersecting);

          if (entry.isIntersecting) {
            setIsInViewMap((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
            observer.unobserve(entry.target); // Stop observing after entering view
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(imageRefs.current).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
        console.log("Observing:", ref.current.dataset.id, ref.current); // ✅ Debugging
      } else {
        console.warn("❌ Warning: ref.current is NULL for:", ref); // ✅ Detect issues
      }
    });

    return () => observer.disconnect();
  }, [productData]);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    return <div>Something went wrong....</div>;
  }

  return (
    <div>
      {productData.length > 0 && (
        <div className="product-container">
          {productData.map((item) => (
            <EcommerceCard
              key={item.id}
              product={item}
              callback={callback}
              addToCartCallBack={callback}
              imageRef={getImageRef(item.id)} // Pass ref
              isInView={isInViewMap[item.id] || false} // Pass isInView status
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
