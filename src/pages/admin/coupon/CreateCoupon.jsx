import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {toast} from 'react-toastify'
import { getCoupons, removeCoupon, createCoupon } from "../../../apiCalls/coupon"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from "../../../components/nav/AdminNav"

const CreateCoupon = () => {
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const  [discount, setDiscount] = useState('')
    const [loading , setLoading] = useState(false)

    const userToken = useSelector((state) => state && state.user ? state.user.token : null)

    const handleSubmit = async (e)=> {
        e.preventDefault()
        try{
            setLoading(true)
            console.table(name, expiry, discount)
            const result = await createCoupon({name, expiry, discount}, userToken);
            setLoading(false)
            setName('')
            setDiscount('')
            setExpiry('')
            toast.success(`Coupon ${result.data.name} created!`)
        }catch(err){
            console.log(err)
        }
    }

    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-2 p-1">
                <AdminNav/>
            </div>
            <div className="col-md-10 p-1">
                <h4>Coupon</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label>Name</label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} 
                            value={name}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label>Discount %</label>
                        <input type="text" className="form-control" onChange={(e) => setDiscount(e.target.value)} 
                            value={discount}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label>
                            Expiry
                        </label>
                        <br/>
                        <DatePicker className="form-control" selected={expiry} onChange={(value) => {setExpiry(value)}} required/>
                    </div>
                    <button className="btn btn-info mt-3" >Save</button>
                </form>
            </div>
        </div>
    </div>)
}

export default CreateCoupon
