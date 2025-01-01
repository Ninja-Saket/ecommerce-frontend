import React from "react"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const PaymentSuccess = ()=> {
    const [searchParams, setSearchParams] = useSearchParams()
    const reference = searchParams.get('reference')
    return (
        <div className="container-fluid text-center pt-5">
            <h4>Transaction Successfull</h4>
            <p>Reference Number : {reference}</p>
            <Link to='/user/history'>See it in your purchase history</Link>
        </div>
    )
}

export default PaymentSuccess