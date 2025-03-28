import React, {useState, useEffect} from "react";
import { getProduct, setProductRating } from "../apiCalls/product";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../apiCalls/product";
import ProductCard from "../components/cards/ProductCard"
const Product = ()=> {
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])
    const [star, setStar] = useState(0)
    const user = useSelector((state) => state.user ? state.user : null)
    const userToken = user ? user.token : null

    const {slug} = useParams()

    const loadProduct = async ()=> {
        try{
            const result = await getProduct(slug)
            setProduct(result.data)
            const relatedProduct = await getRelated(result.data._id)
            setRelated(relatedProduct.data)
        }catch(err){
            if(err.response && err.response.status === 400){
                toast.error(err.response.data)
            }
        }
    }

    const onStarClick = async (newRating, name) => {
        const result = await setProductRating(name, newRating, userToken)
        setStar(newRating)
        console.table(newRating, name)
        console.log('Rating set',result)
    }

    useEffect(()=> {
        loadProduct()
    },[slug, star])

    useEffect(() => {
        if(product.ratings && user){
            const existingRatingObject = product.ratings.find(
                (rating) => rating.postedBy.toString() == user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star)
        }
    },[product])

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr/>
                    <h4>Related Products</h4>
                    <hr/>
                </div>
            </div>
            <div className="row pb-5">{related.length ? related.map((r)=> (<div key={r._id} className="col-md-4"><ProductCard product={r}/></div>)) : <div className="text-center col">No Products Found</div>}</div>
        </div>
    )
}

export default Product