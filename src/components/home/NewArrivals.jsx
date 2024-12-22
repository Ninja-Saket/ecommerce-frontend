import React, { useState, useEffect } from "react";
import { getSortedProducts, getProductsCount } from "../../apiCalls/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import { toast } from "react-toastify";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const result = await getSortedProducts("createdAt", "desc", page);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProductCount = async () => {
    try {
      const result = await getProductsCount();
      if (result && result.data) {
        setProductsCount(result.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    loadProductCount();
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
      <div className="row">
        <nav className="col-md-4 d-flex justify-content-center mx-auto text-center pt-5">
          <Pagination
            current={page}
            total={productsCount}
            pageSize={3}
            onChange={(value) => {
              setPage(value);
            }}
          />
        </nav>
      </div>
    </div>
  );
};

export default NewArrivals;
