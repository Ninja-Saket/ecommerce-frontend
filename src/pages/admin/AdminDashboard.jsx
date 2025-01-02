import React, {useState, useEffect} from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeOrderStatus } from "../../apiCalls/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";


const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const userToken = useSelector((state) => state && state.user ? state.user.token : null)
  
  const loadOrders = async ()=> {
    try{
      const result = await getOrders(userToken)
      setOrders(result.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleStatusChange = async (orderId, orderStatus)=> {
    try{
      const result = await changeOrderStatus(orderId, orderStatus, userToken)
      toast.success('Order Status Updated!')
      await loadOrders()
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    loadOrders()
  },[])

  return (
    <div className="container-fluid m-3">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Admin Dashboard Page</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
