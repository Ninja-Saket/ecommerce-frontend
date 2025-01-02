import React, {useEffect} from "react"
import { createRazorpayOrder } from "../apiCalls/payment"
import { useSelector, useDispatch } from "react-redux"
import { createOrder, emptyUserCart } from "../apiCalls/user"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Payment = ()=> {
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)
    const coupon = useSelector((state) => state && state.coupon ? state.coupon : false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loadRazorpayOrder = async()=> {
        try{
            const result = await createRazorpayOrder(userToken, coupon)
            const order = result.data.order
            console.log('Result --> ', result)
            console.log('Order in frontend -->', order)
            const options = {
                "key": "rzp_test_HCS7SNb8LjqcCo", 
                "amount": order.amount*100,
                "currency": "INR",
                "name": "SAKET KUMAR RAY", 
                "description": "Test Transaction",
                "image": "https://avatars.githubusercontent.com/u/69805419?v=4",
                "order_id": order.id,
                "handler": async function (response) {
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    try {
                        const result = await axios.post(`${import.meta.env.VITE_APP_API}/payment-verification`, payload, {
                            headers: {
                                authToken : userToken
                            },
                        });
                        console.log("Payment verification result:", result.data);
                        if(result.data.success){
                            const orderResult = await createOrder(payload, userToken)
                            console.log('orderResult ---> ', orderResult)
                            if(orderResult.data.ok){
                                // Remove cart from localstorage
                                if(typeof window != 'undefined'){
                                    localStorage.removeItem('cart')
                                }
                                // Remove cart from redux store
                                dispatch({
                                    type : 'ADD_TO_CART',
                                    payload : []
                                })
                                // Remove applied coupon from redux store
                                dispatch({
                                    type : 'COUPON_APPLIED',
                                    payload : false
                                })
                                // Empty user cart
                                await emptyUserCart(userToken)
                            }
                        }
                        navigate(`/user/paymentsuccess?reference=${payload.razorpay_payment_id}`)
                    } catch (err) {
                        console.error("Error verifying payment:", err.response ? err.response.data : err.message);
                    }
                },
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office",
                    
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const razorWidget = new window.Razorpay(options)

            razorWidget.open()
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=> {
        loadRazorpayOrder()
    }, [])
    return (
        <div className="container p-5 text-center">
            <h4>Complete your purchase</h4>
        </div>
    )
}

export default Payment