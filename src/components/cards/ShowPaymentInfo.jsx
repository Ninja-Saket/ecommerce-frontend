import React from "react";

const ShowPaymentInfo = ({order})=> {
    return <div>
        <p>
            <span>
                Order Id : {order.paymentData.order_id}
            </span>{" / "}
            <span>Amount : {(order.paymentData.amount /= 100).toLocaleString("en-IN", {
                style : "currency",
                currency : 'INR'
            })}</span>{" / "}
            <span>Currency : {(order.paymentData.currency.toUpperCase())}</span>{" / "}
            <span>Method : {order.paymentData.method}</span>{" / "}
            <span>Payment : {order.paymentData.status}</span>{" / "}
            <span>Ordered on : {new Date(order.paymentData.created_at*1000).toLocaleString()}</span>{" / "}
            <span className="badge bg-info text-white">STATUS : {order.orderStatus}</span>
        </p>
    </div>
}

export default ShowPaymentInfo