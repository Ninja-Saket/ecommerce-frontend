import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../apiCalls/coupon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const userToken = useSelector((state) =>
    state && state.user ? state.user.token : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.table(name, expiry, discount);
      const result = await createCoupon({ name, expiry, discount }, userToken);
      await loadCoupons();
      setName("");
      setDiscount("");
      setExpiry("");
      setLoading(false);
      toast.success(`Coupon ${result.data.name} created!`);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCoupons = async ()=> {
    try{
        const result = await getCoupons();
        setCoupons(result.data)
    }catch(err){
        console.log(err)
    }
  }

  const handleRemove = async (couponId) => {
    try{
        if(window.confirm('Delete?')){
            setLoading(true)
            const result = await removeCoupon(couponId, userToken)
            await loadCoupons()
            setLoading(false)
            toast.success(`Coupon ${result.data.name} deleted!`)
        }
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    loadCoupons()
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-1">
          <AdminNav />
        </div>
        <div className="col-md-10 p-1 px-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <>
              <h4>Coupon</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Discount %</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Expiry</label>
                  <br />
                  <DatePicker
                    className="form-control"
                    selected={expiry}
                    onChange={(value) => {
                      setExpiry(value);
                    }}
                    required
                  />
                </div>
                <button className="btn btn-info mt-3">Save</button>
              </form>
            </>
          )}

          <br/>
          <h4>{coupons.length} Coupons</h4>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" className="custom-tablehead">Name</th>
                    <th scope="col" className="custom-tablehead">Expiry</th>
                    <th scope="col" className="custom-tablehead">Discount</th>
                    <th scope="col" className="custom-tablehead">Action</th>
                </tr>
            </thead>
            <tbody>
                {coupons.map((c)=> (
                    <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                        <td>{c.discount}%</td>
                        <td className="text-center"><DeleteOutlined onClick={()=> handleRemove(c._id)} className="text-danger" style={{cursor : "pointer"}}/></td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
