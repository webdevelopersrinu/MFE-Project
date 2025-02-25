import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';


import "./style.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PrdoctData from "./components/PrdoctData.jsx";
import CartItems from "./components/CartItems.jsx";
import ProductInformation from "./components/ProductInformation.jsx";
import { store } from "./store/index.js";
import LoginPage from "./components/LoginPage.jsx";
import HomePage from "./components/HomePage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductQuryComponet from "./components/ProductQuryComponet.jsx";
import productMockData from "./utils/mockData.json"

let productDataList = productMockData
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppLayout />
      </Router>
    </Provider>
  );
}

const AppLayout = () => {
  return (
    <>
      <Header />
      <MainRoutes />
      <Toaster />
      <Footer />
    </>
  );
}


const MainRoutes = () => {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState(null);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [productData, setProductData] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [prductPath, setProductPath] = useState("")

  useEffect(() => {

    const path = location.pathname.replace("/", "").toLowerCase();
    const services = {
      cart: "cart-service",
      login: "login-service",
    };
    if (!path) {
      // If path is empty, render Home Page
      setServiceType("home");
      setPageNotFound(false);
      return;
    }

    if ((/^\d+$/.test(path))) {
      const productById = productDataList.find(item => item.id === +path);
      if (productById) {
        setProductInfo(productById);
        setPageNotFound(false);
      } else {
        setPageNotFound(true);
      }
    } else if (services[path]) {
      setServiceType(path);
    } else {
      const productByName = productDataList.filter(item =>
        item.title.toLowerCase().includes(path.toLowerCase())
      );
      if (productByName.length > 0) {
        setProductPath(path);
        setProductData(productByName);
        setPageNotFound(false);
      } else {
        setPageNotFound(true);
      }
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartItems />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/product" element={<PrdoctData products={productDataList} />} />
      <Route path="/product-info" element={<ProductQuryComponet />} />
      {/* dynamic routing */}
      {/* {serviceType === "home" && <HomePage />} */}
      {/* {serviceType === "cart" && <CartItems />}
      {serviceType === "login" && <LoginPage />} */}
      {productInfo && <Route path={`/${productInfo.id}`} element={<ProductInformation data={productInfo} />} />}
      {productData.length > 0 && <Route path={`/${prductPath}`} element={<PrdoctData products={productData} />} />}

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
  // const routeing = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <AppLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <HomePage />
  //       },
  //       {
  //         path: "product",
  //         element: <PrdoctData />,
  //       },
  //       {
  //         path: "cart",
  //         element: <CartItems />,
  //       },
  //       {
  //         path: "product-info",
  //         element: <ProductInformation />,
  //       },
  //       {
  //         path: "login",
  //         element: <LoginPage />
  //       }
  //     ],
  //   },
  // ]);
  // return <Provider store={store}>
  //   <RouterProvider router={routeing} />

  // </Provider>

};


export default App;
