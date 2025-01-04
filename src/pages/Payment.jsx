import React, {useEffect} from "react"
import { createRazorpayOrder, getPaymentDetails } from "../apiCalls/payment"
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
                "key": import.meta.env.VITE_APP_RAZORPAY_API_KEY, 
                "amount": order.amount*100,
                "currency": "INR",
                "name": "SAKET KUMAR RAY", 
                "description": "Test Transaction",
                "image": "https://avatars.githubusercontent.com/u/69805419?v=4",
                "order_id": order.id,
                "handler": async function (response) {
                    console.log('Payment REsponse ->', response)
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
                            const paymentData = await getPaymentDetails(payload.razorpay_payment_id, userToken)
                            console.log('Payment Details --->', paymentData)
                            const orderResult = await createOrder(paymentData.data, userToken)
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