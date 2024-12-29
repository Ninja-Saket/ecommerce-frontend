import React from "react";
import ModalImage from "react-modal-image"
import laptop from '../../images/dell-precision.avif'
import { useDispatch } from "react-redux";
import { InputNumber } from "antd";
import {toast} from 'react-toastify'
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from '@ant-design/icons'

const ProductCardInCheckout = ({p}) => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"]
    const dispatch = useDispatch()
    const handleColorChange = (e)=> {
        let cart = []
        if(typeof window != 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if(product._id == p._id){
                    cart[i].color = e.target.value;
                }
            }) 
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type : 'ADD_TO_CART',
                payload : cart
            })
        }
    }
    const handleQuantityChange = (value) => {
        console.log(p.quantity)
        if(value > p.quantity){
            toast.error('Max availabe qunatity reached')
            return;
        }
        let cart = []
        if(typeof window != 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, i) => {
                if(product._id == p._id){
                    cart[i].count = value;
                }
            }) 
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type : 'ADD_TO_CART',
                payload : cart
            })
        }
    }

    const handleRemove = ()=> {
        let cart = []
        if(typeof window != 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            let spliceIndex = -1;
            cart.map((product, i) => {
                if(product._id == p._id){
                    spliceIndex = i;
                }
            }) 
            if(spliceIndex != -1){
                cart.splice(spliceIndex,1)
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type : 'ADD_TO_CART',
                payload : cart
            })
        }
    }
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{width : "100px" }}>
                        {
                            p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url}/>) 
                            : 
                            (<ModalImage small={laptop} large={laptop}/>)
                        }
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name="color" className="form-control" style={{minWidth: '70px'}}>
                        {p.color ? (<option>{p.color}</option>) : (<option>Select</option>)}
                        {
                            colors.filter((c)=> c != p.color).map((c)=> (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))
                        }
                    </select>
                </td>
                <td className="text-center"><InputNumber style={{minWidth : '70px'}} min={1} value={p.count} onChange={handleQuantityChange}/></td>
                <td className="text-center">{p.shipping == "Yes" ? (<CheckCircleOutlined className="text-success"/>) : (<CloseCircleOutlined className="text-danger"/>)}</td>
                <td className="text-center"><CloseOutlined className="text-danger" onClick={handleRemove} style={{cursor: 'pointer'}}/></td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout