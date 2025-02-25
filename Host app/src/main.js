import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrdoctData from "./components/PrdoctData.jsx";
import CartItems from "./components/CartItems.jsx";
import ProductInformation from "./components/ProductInformation.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
