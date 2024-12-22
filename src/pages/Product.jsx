import React, {useState, useEffect} from "react";
import { getProduct } from "../apiCalls/product";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ()=> {
    const [product, setProduct] = useState({})
    const {slug} = useParams()

    const loadProduct = async ()=> {
        try{
            const result = await getProduct(slug)
            setProduct(result.data)
        }catch(err){
            if(err.response && err.response.status === 400){
                toast.error(err.response.data)
            }
        }
    }

    useEffect(()=> {loadProduct()},[slug])

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product}/>
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr/>
                    <h4>Related Products</h4>
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default Product