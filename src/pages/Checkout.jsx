import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyUserCart, getUserCart, saveUserAddress, applyCoupon, createCodOrder } from "../apiCalls/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import JoditEditor from 'jodit-react'

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')
  const editor = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) =>
    state && state.user ? state.user.token : null
  );

  const couponApplied = useSelector((state) => state && state.coupon ? state.coupon : false)
  const cod = useSelector((state) => state && state.cod ? state.cod : false)

  const loadCartInfo = async () => {
    try {
      const result = await getUserCart(userToken);
      setProducts(result.data.products);
      setCartTotal(result.data.cartTotal);
    } catch (err) {
      toast.error('Error loading cart')
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
      setTotalAfterDiscount(0)
      setCoupon("")
      setDiscountError("")
      setAddress("")
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

  const showAddress = ()=> {
    return <><JoditEditor ref={editor} value={address} onChange={setAddress}/>
    <button className="btn btn-info mt-3" onClick={saveAddressToDb}>
      Save
    </button></>
  }

  const showProductSummary = ()=> {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ))
  }

  const applyDiscountCoupon = async ()=> {
    try{
      const result = await applyCoupon(coupon, userToken)
      setTotalAfterDiscount(result.data)
      dispatch({
        type : 'COUPON_APPLIED',
        payload : true
      })
    }catch(err){
      setDiscountError(err.response.data.err)
      dispatch({
        type : 'COUPON_APPLIED',
        payload : false
      })
    }
  }

  const handleCouponInputChange = (e)=> {
    setCoupon(e.target.value)
    if(discountError){
      setDiscountError('')
    }
  }

  const showApplyCoupon = () => {
   return  <>
      <input className="form-control" type="text" value={coupon} onChange={handleCouponInputChange}  />
      <button className="btn btn-info mt-3" onClick={applyDiscountCoupon}>
        Apply
      </button>
    </>
  }

  const handleCodOrder = async ()=> {
    try{
      const result = await createCodOrder(cod,couponApplied, userToken)
      if(result.data.ok){
        // Empty local storage
        if(typeof window != 'undefined'){
          localStorage.removeItem('cart')
        }

        // Empty cart
        dispatch({
          type : "ADD_TO_CART",
          payload : []
        })

        // Remove coupon from redux
        dispatch({
          type : 'COUPON_APPLIED',
          payload : false
        })

        // Remove cod from redux
        dispatch({
          type : "COD",
          payload : false
        })

        // Empty cart from backend
        await emptyUserCart(userToken)
        setTimeout(()=> {
          navigate('/user/history')
        }, 1000)
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
          {showAddress()}
          <hr />
          <h4 style={{marginTop : '35px'}}>Got Coupon?</h4>
          {showApplyCoupon()}
          <br/>
          {discountError && <p className="bg-danger mt-2 p-2">{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>
            Cart Total : <b>${cartTotal}</b>
          </p>
          {totalAfterDiscount > 0 && (<p className="bg-success p-2">Discount Applied: Total Payable: ${totalAfterDiscount}</p>)}

          <div className="row">
            <div className="col-md-6">
              {cod ? (<button className="btn btn-info" disabled={!addressSaved} onClick={handleCodOrder}>Place Order</button>) : (<button className="btn btn-info" disabled={!addressSaved} onClick={()=> navigate('/user/payment')}>Place Order</button>)}
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
