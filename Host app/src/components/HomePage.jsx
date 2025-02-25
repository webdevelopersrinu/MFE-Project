import React, { lazy, Suspense } from 'react'
const Home = lazy(() => import("Home/Home"));

function HomePage() {
    return (
        <div>
            <Suspense fallback={null}>
                <Home />
            </Suspense>
        </div>
    )
}

export default HomePage