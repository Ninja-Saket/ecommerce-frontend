import React, { useState, useEffect } from "react";
import { getCategory } from "../../apiCalls/category";
import { getRelatedByCategory } from "../../apiCalls/product";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const loadCategory = async () => {
    try {
      setLoading(true);
      const result = await getCategory(slug);
      setCategory(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    if (!category._id) {
      return;
    }
    try {
      setLoading(true);
      const result = await getRelatedByCategory(category._id);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
  }, [slug]);

  useEffect(() => {
    loadRelatedProducts();
  }, [category]);

  return <div className="container-fluid">
    <div className="row">
        <div className="col">
            {loading ? (<h4 className="text-center p-3 mt-5 mb-5 display-5 shadow-5 rounded">Loading...</h4>) : (<h4 className="text-center p-3 mt-5 mb-5 display-5 shadow-5 rounded" style={{"backgroundColor" : "#cecfd6"}}>{products.length} {products.length > 1 ? "Products" : "Product" } in "{category.name}" category</h4>)}
        </div>
    </div>
    <div className="row justify-content-center">
        {products.map((p) => (
            <div className="col-md-4" key={p._id}>
                <ProductCard product={p}/>
            </div>
        ))}
    </div>
  </div>;
};

export default CategoryHome;
