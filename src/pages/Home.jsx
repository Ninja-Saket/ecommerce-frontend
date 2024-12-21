import React, { useState, useEffect } from "react";
import { getProducts } from "../apiCalls/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const result = await getProducts(10);
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
    <>
      <div className="p-5 text-center bg-light shadow-5 rounded mb-5 text-danger font-weight-bold h1">
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <Jumbotron text={["New Arrivals", "Best Sellers"]} />
        )}
      </div>
      <div className="container">
        {loading ? (
          <LoadingCard count={3}/>
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
    </>
  );
};

export default Home;
