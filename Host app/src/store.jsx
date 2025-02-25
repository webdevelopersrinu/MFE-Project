import React, { createContext, useContext, useState } from "react";

const ParentContext = createContext();

export const ParentContextProvider = ({ children }) => {
    const [productInfo, setProductInfo] = useState({});
    const [data, setData] = useState("")
    return (
        <ParentContext.Provider value={{ productInfo, setProductInfo, data, setData }}>
            {children}
        </ParentContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(ParentContext);
};