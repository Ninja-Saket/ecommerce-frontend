import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../apiCalls/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {DeleteOutlined} from '@ant-design/icons'

const Wishlist = ()=> {
    const [wishlist, setWishlist] = useState([])
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)

    const loadWishlist = async ()=> {
        try{
            const result = await getWishlist(userToken)
            setWishlist(result.data.wishlist)
        }catch(err){
            console.log(err)
        }
    }

    const handleRemove = async (productId) => {
        try{
            const result = await removeWishlist(productId, userToken)
            loadWishlist()
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        loadWishlist()
    },[])
    return (<div className="container-fluid mt-3">
        <div className="row">
            <div className="col-md-2">
                <UserNav/>
            </div>
            <div className="col-md-10">
                <h4>Wishlist</h4>
                {wishlist.map(p => (
                    <div key={p._id} className="alert alert-secondary d-flex justify-content-between">
                        <Link to={`/product/${p.slug}`}>{p.title}</Link>
                        <span onClick={() => handleRemove(p._id)} className="btn btn-sm">
                            <DeleteOutlined className="text-danger"/>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>)
}

export default Wishlist;