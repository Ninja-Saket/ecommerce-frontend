import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProducts } from "../../../apiCalls/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true;
    setLoading(true)
    const loadProducts = async ()=> {
      try{
        const result = await getProducts(100)
        if(isMounted){
          setProducts(result.data)
          setLoading(false)
        }
      }catch(err){
        if(isMounted){
          console.log("Error in getting products",err)
          setLoading(false)
        }
      }
    }
    loadProducts()
    return () => {
      isMounted = false; // Cleanup
      setLoading(false)
    };
  }, [])
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
              return <div key={product._id} className="col-md-4 p-1"> <AdminProductCard product={product}/> </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
