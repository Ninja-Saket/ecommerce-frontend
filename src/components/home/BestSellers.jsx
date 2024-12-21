import React, { useState, useEffect } from "react";
import { getSortedProducts } from "../../apiCalls/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const result = await getSortedProducts("createdAt", "desc", 3);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <div className="container">
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 p-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
