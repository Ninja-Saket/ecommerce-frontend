import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProducts } from "../../../apiCalls/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../apiCalls/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const userToken = useSelector(state => state.user.token)

  const loadAllProducts = async ()=> {
    try{
      setLoading(true)
      const result = await getProducts(100)
      setProducts(result.data)
      setLoading(false)
    }catch(err){
      console.log("Error in getting products",err)
      setLoading(false)
    }
  }
  useEffect(() => {
    loadAllProducts()
    return () => {
      setLoading(false)
    };
  }, [])

  const handleRemove = async (slug) => {
    try{
      if(window.confirm("Delete ?")){
        const result = await removeProduct(slug, userToken)
        await loadAllProducts()
        toast.success(`Product ${result.data.title} is deleted`)
      }
    }catch(err){
      if(err.response && err.response.status === 400){
        toast.error(err.response.data)
      }
      console.log(err)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
          <div className="row">
            {products.map((product) => {
              return <div key={product._id} className="col-md-4 p-1"> <AdminProductCard product={product} handleRemove={handleRemove}/> </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
