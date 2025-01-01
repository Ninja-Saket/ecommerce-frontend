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

export {createRazorpayOrder}