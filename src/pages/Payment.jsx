import React, {useEffect} from "react"
import { createRazorpayOrder } from "../apiCalls/payment"
import { useSelector, useDispatch } from "react-redux"

const Payment = ()=> {
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)
    const coupon = useSelector((state) => state && state.coupon ? state.coupon : false)

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
                "callback_url": `${import.meta.env.VITE_APP_API}/payment-verification`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
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