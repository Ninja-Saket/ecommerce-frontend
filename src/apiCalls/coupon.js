import axios from 'axios'

const getCoupons = async () => {
    const result = await axios.get(
        `${import.meta.env.VITE_APP_API}/coupons`
    );
    return result;
}

const removeCoupon = async (couponId, authToken)=> {
    const result = await axios.delete(
        `${import.meta.env.VITE_APP_API}/coupon/${couponId}`,{
            headers : {
                authToken
            }
        }
    )
    return result
}

const createCoupon = async (coupon, authToken) => {
    const result = await axios.post(`${import.meta.env.VITE_APP_API}/coupon`, {coupon}, {
        headers : {
            authToken
        }
    })
    return result
}


export {getCoupons, removeCoupon, createCoupon}