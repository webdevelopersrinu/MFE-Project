import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-7xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page not found</h2>
            <p className="text-gray-600 mt-2 text-center px-6">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;
