import React from "react";
import UserNav from "../../components/nav/UserNav";

const Wishlist = ()=> {
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav/>
            </div>
            <div className="col">User Wishlist Page</div>
        </div>
    </div>)
}

export default Wishlist;