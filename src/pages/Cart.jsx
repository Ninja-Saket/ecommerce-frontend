import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { createUserCart } from "../apiCalls/user";

const Cart = () => {
    const cart = useSelector((state) => state && state.cart ? state.cart : [])
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getTotal = () => {
        return cart.reduce((prevTotal, currentCartItem) => {
            return prevTotal + currentCartItem.count * currentCartItem.price
        }, 0)
    }

    const saveOrderToDb = async ()=> {
        const result = await createUserCart(cart,userToken )
        navigate('/user/checkout')
    }

    const saveCodOrderToDb = async ()=> {
        const result = await createUserCart(cart,userToken )
        dispatch({
            type : 'COD',
            payload : true
        })
        navigate('/user/checkout')
    }

    const showCartItems = () => {
        return <div className="table-responsive"><table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {cart.map((p) => (<ProductCardInCheckout key={p._id} p={p}/>)) }
            </table></div>
    }

    return <div className="container-fluid pt-2">
        <div className="row">
            <div className="col-md-8">
                <h4>Cart / {cart.length} Product</h4>
                <p style={{fontStyle : "italic", fontWeight : "bold",  color : "red", margin:"10px 0"}}>**All products listed here are for demo purpose only. Please do not place order for them.**</p>
                {!cart.length ? (<p>No products in cart. <Link to='/shop'>Continue Shopping.</Link></p>) : (showCartItems())}
            </div>
            <div className="col-md-4">
                <h4>Order Summary</h4>
                <hr/>
                <p >Products</p>
                {cart.map((c,i)=> (
                    <div key={i}>
                        <p>
                            {c.title} X {c.count} = Rs. {c.price * c.count}
                        </p>
                    </div>
                ))}
                <hr/>
                <span>Total : <b>Rs. {getTotal()}</b></span>
                <hr/>
                {
                    userToken ? (<><button onClick={saveOrderToDb} disabled={!cart.length} className="btn btn-block btn-info mt-3 p-3">Proceed to Checkout</button>
                    <button onClick={saveCodOrderToDb} disabled={!cart.length} className="btn btn-block btn-info mt-3 p-3">Pay cash on delivery</button></>) : (<Link to="/login" state={{from : "/cart"}}><button className="btn btn-md btn-info mt-2">Login to checkout</button></Link>)
                }
            </div>
        </div>
    </div>
}

export default Cart;