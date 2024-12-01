import React from "react"
import { Link } from "react-router-dom";
import Password from "../../pages/user/Password";
import Wishlist from "../../pages/user/Wishlist";
import History from "../../pages/user/History";

const UserNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to='/user/history' className="nav-link">History</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/password' className="nav-link">Password</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/wishlist' className="nav-link">Wishlist</Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav;

