import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import OrderTable from "./OrderTable";

const Orders = ({orders, handleStatusChange})=> {
    return <>
        {orders.map((order) => (
            <div key={order._id} className="row p-3 mt-3 card d-flex flex-row">
                <ShowPaymentInfo order={order}/>
                <div className="col-md-2 d-flex align-items-center">
                   <b> Delivery Status</b>
                </div>
                <div className="col-md-4">
                    <select onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="form-control"
                        defaultValue={order.orderStatus}   
                        name="status" 
                    >
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <OrderTable order={order}/>
            </div>
        ))}
    </>
}

export default Orders