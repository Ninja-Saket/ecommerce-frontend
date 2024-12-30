import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyUserCart, getUserCart, saveUserAddress } from "../apiCalls/user";
import { toast } from "react-toastify";

import JoditEditor from 'jodit-react'

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false)
  const editor = useRef(null)
  const dispatch = useDispatch();

  const userToken = useSelector((state) =>
    state && state.user ? state.user.token : null
  );

  const loadCartInfo = async () => {
    try {
      const result = await getUserCart(userToken);
      setProducts(result.data.products);
      setCartTotal(result.data.cartTotal);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      // Remove cart from local storage
      if (typeof window != "undefined") {
        localStorage.removeItem("cart");
      }
      // Remove cart from redux
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // Remove cart from backend
      const result = await emptyUserCart(userToken);
      setProducts([]);
      setCartTotal(0);
      toast.success("Cart is empty. Continue Shopping!");
    } catch (err) {
      console.log(err);
    }
  };

  const saveAddressToDb = async ()=> {
    try{
        const result = await saveUserAddress(address, userToken)
        if(result.data.ok){
            setAddressSaved(true)
            toast.success('Address saved successfully')
        }
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    loadCartInfo();
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <JoditEditor ref={editor} value={address} onChange={setAddress}/>
          <button className="btn btn-info mt-3" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          coupon input and apply button
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>
            Cart Total : <b>${cartTotal}</b>
          </p>

          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-info" disabled={!addressSaved}>Place Order</button>
            </div>
            <div className="col-md-6">
              <button
                onClick={handleEmptyCart}
                disabled={!products || !products.length}
                className="btn btn-info"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
