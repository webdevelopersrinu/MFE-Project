import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
const ProductInfo = lazy(() => import("ProductInfo/ProductInfo"));
import productMockData from "./../utils/mockData.json"


function ProductQuryComponet() {
    // Getting query parameter
    const [searchParams] = useSearchParams()
    const [data, setData] = useState(null)
    const products = productMockData

    useEffect(() => {
        const productId = searchParams.get("id");
        const product = products.find(item => item.id === +productId)
        setData(product)
    }, [])
    return (
        <div>
            <Suspense fallback={null}>
                {
                    data ? <ProductInfo product={data} />
                        : <h1>hello</h1>
                }
            </Suspense>
        </div>
    )
}

export default ProductQuryComponet