import React from "react";
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <nav>
                <ul>

                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/product"}>Product</Link></li>
                    <li><Link to={"/cart"}>Cart</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;
