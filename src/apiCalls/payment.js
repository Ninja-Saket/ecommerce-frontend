import axios from 'axios'

const createRazorpayOrder = async(authToken, coupon)=> {
    const result = await axios.post(
        `${import.meta.env.VITE_APP_API}/create-razorpay-order`, {couponApplied : coupon}, {
            headers : {
                authToken
            }
        }
    );
    return result
}

const getPaymentDetails = async (razorpay_payment_id, authToken)=> {
    const result = await axios.post(
        `${import.meta.env.VITE_APP_API}/payment-details`, {razorpay_payment_id}, {
            headers : {
                authToken
            }
        }
    );
    return result
}

export {createRazorpayOrder, getPaymentDetails}