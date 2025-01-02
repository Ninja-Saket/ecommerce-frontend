import React, {useState, useEffect} from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../apiCalls/user";
import { useSelector, useDispatch } from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice.jsx'
const History = ()=> {
    const [orders, setOrders] = useState([])
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)

    const loadUserOrders = async ()=> {
        try{
            const result = await getUserOrders(userToken)
            console.log(JSON.stringify(result.data, null, 2))
            setOrders(result.data)
        }catch(err){

        }
    }

    useEffect(()=> {
        loadUserOrders()
    },[])

    const showOrderInTable = (order)=> {
        return <div className="table-responsive">
        <table className="table table-bordered">
            <thead className="table-light">
                <tr>
                    <th scope="col" className="custom-tablehead">Title</th>
                    <th scope="col" className="custom-tablehead">Price</th>
                    <th scope="col" className="custom-tablehead">Brand</th>
                    <th scope="col" className="custom-tablehead">Color</th>
                    <th scope="col" className="custom-tablehead">Count</th>
                    <th scope="col" className="custom-tablehead">Shipping</th>
                </tr>
            </thead>
            <tbody>
                {order.products.map((p,i)=> (
                    <tr key={i}>
                        <td>
                            <b>{p.product.title}</b>
                        </td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping === "Yes" ? (<CheckCircleOutlined style={{color: "green"}}/>) : (<CloseCircleOutlined style={{color : "red"}}/>)}</td>
                    </tr>
                ))}
            </tbody>

        </table>
        </div>
    }

    const showDownloadLink = (order)=> {
        return <PDFDownloadLink
            document={<Invoice order={order}/>}
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-info"
        >
            Download PDF
        </PDFDownloadLink>
    }

    const showEachOrders = ()=> {
        return orders.map((order, i) => (<div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order}/>
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    {showDownloadLink(order)}
                </div>
            </div>
        </div>))
    }
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav/>
            </div>
            <div className="col text-center p-2"><h4>{orders.length ? "User purchase orders" : "No purchase orders"}</h4>
            {showEachOrders()}
            </div>
        </div>
    </div>)
}

export default History;